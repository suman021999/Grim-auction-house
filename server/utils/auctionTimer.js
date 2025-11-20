// utils/auctionTimer.js

const activeTimers = new Map();

/**
 * Start countdown for an auction
 * @param {Object} io - socket.io instance
 * @param {String} auctionId - MongoDB auction ID
 * @param {String} endTime - ISO end time
 */
export const startAuctionCountdown = (io, auctionId, endTime) => {
  if (activeTimers.has(auctionId)) {
    return; // timer already exists
  }

  const end = new Date(endTime).getTime();

  const interval = setInterval(() => {
    const now = Date.now();
    let remaining = end - now;

    if (remaining <= 0) {
      remaining = 0;

      io.to(`auction_${auctionId}`).emit("timeUpdate", {
        auctionId,
        remaining,
        ended: true,
      });

      clearInterval(interval);
      activeTimers.delete(auctionId);
      return;
    }

    // Convert milliseconds → H:M:S
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    io.to(`auction_${auctionId}`).emit("timeUpdate", {
      auctionId,
      remaining,
      hours,
      minutes,
      seconds,
      ended: false,
    });
  }, 1000);

  activeTimers.set(auctionId, interval);
};
