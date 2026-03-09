import { Create } from "../models/create.models.js";
import { Bid } from "../models/bid.models.js";
import { Conversation } from "../models/conversation.model.js";

export const startAuctionCountdown = (io, auctionId, endTime) => {
  const interval = setInterval(async () => {

    const now = new Date().getTime();
    const end = new Date(endTime).getTime();

    const remaining = end - now;

    if (remaining <= 0) {
      clearInterval(interval);

      // ✅ find auction
      const auction = await Create.findById(auctionId);

      if (!auction || auction.auctionStatus === "Ended") return;

      // ✅ end auction
      auction.auctionStatus = "Ended";
      auction.soldOut = true;

      await auction.save();

      // ✅ find winner
      const highestBid = await Bid.findOne({ auction: auctionId })
        .sort({ amount: -1 })
        .populate("user");

      let conversation = null;

      if (highestBid) {
        conversation = await Conversation.findOne({
          auctionId: auction._id,
          buyer: highestBid.user._id,
          seller: auction.user,
        });

        if (!conversation) {
          conversation = await Conversation.create({
            auctionId: auction._id,
            buyer: highestBid.user._id,
            seller: auction.user,
          });
        }
      }

      // ✅ socket emit
      io.to(`auction_${auctionId}`).emit("auctionEnded", {
        auctionId,
        winner: highestBid?.user || null,
      });

      if (conversation) {
        io.to(highestBid.user._id.toString()).emit(
          "conversationCreated",
          conversation
        );

        io.to(auction.user.toString()).emit(
          "conversationCreated",
          conversation
        );
      }

      return;
    }

    io.to(`auction_${auctionId}`).emit("auctionCountdown", {
      auctionId,
      remaining,
    });

  }, 1000);
};
