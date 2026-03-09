export const startAuctionCountdown = (io, auctionId, endTime) => {
  const interval = setInterval(() => {

    const now = new Date().getTime();
    const end = new Date(endTime).getTime();

    const remaining = end - now;

    if (remaining <= 0) {
      clearInterval(interval);

      io.to(`auction_${auctionId}`).emit("auctionEnded", {
        auctionId,
      });

      return;
    }

    io.to(`auction_${auctionId}`).emit("auctionCountdown", {
      auctionId,
      remaining,
    });

  }, 1000);
};
