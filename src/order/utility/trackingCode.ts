export function generateTrackingId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let trackingId = '';
    for (let i = 0; i < 8; i++) {
      trackingId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return trackingId;
  }
  