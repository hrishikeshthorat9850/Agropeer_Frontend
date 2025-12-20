/**
 * Toast Queue Management System
 * Handles multiple toasts with queue management
 */

class ToastQueue {
  constructor(maxToasts = 5) {
    this.queue = [];
    this.maxToasts = maxToasts;
    this.listeners = new Set();
  }

  /**
   * Subscribe to queue changes
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of queue changes
   */
  notify() {
    this.listeners.forEach(listener => listener([...this.queue]));
  }

  /**
   * Add toast to queue
   */
  add(toast) {
    const id = toast.id || `toast-${Date.now()}-${Math.random()}`;
    const newToast = {
      ...toast,
      id,
      createdAt: Date.now(),
    };

    // If queue is full, remove oldest
    if (this.queue.length >= this.maxToasts) {
      this.queue.shift();
    }

    this.queue.push(newToast);
    this.notify();
    return id;
  }

  /**
   * Remove toast from queue
   */
  remove(id) {
    this.queue = this.queue.filter(toast => toast.id !== id);
    this.notify();
  }

  /**
   * Clear all toasts
   */
  clear() {
    this.queue = [];
    this.notify();
  }

  /**
   * Get current queue
   */
  getQueue() {
    return [...this.queue];
  }
}

export default ToastQueue;

