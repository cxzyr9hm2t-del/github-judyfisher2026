import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check, X, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import { useNotificationStore } from '../../store/notifications'
import { formatDistanceToNow } from 'date-fns'

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const notifications = useNotificationStore((state) => state.notifications)
  const unreadCount = useNotificationStore((state) => state.unreadCount)
  const markAsRead = useNotificationStore((state) => state.markAsRead)
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead)
  const clearNotification = useNotificationStore((state) => state.clearNotification)

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error-500" />
      default:
        return <Info className="w-5 h-5 text-primary-400" />
    }
  }

  const getColorClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-success-500/30 bg-success-600/10'
      case 'warning':
        return 'border-warning-500/30 bg-warning-600/10'
      case 'error':
        return 'border-error-500/30 bg-error-600/10'
      default:
        return 'border-primary-400/30 bg-primary-600/10'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-silver/10 rounded-lg transition"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-96 max-h-[600px] glass-panel border border-silver/10 rounded-lg shadow-xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-silver/10 flex items-center justify-between">
                <h3 className="font-bold text-chrome">Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary-400 hover:text-primary-300 transition"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-silver/30 mx-auto mb-3" />
                    <p className="text-sm text-silver">No notifications</p>
                  </div>
                ) : (
                  <div className="p-2 space-y-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-3 rounded-lg border ${getColorClass(notification.type)} ${
                          !notification.read ? 'border-l-4' : ''
                        } transition`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm font-bold text-chrome">{notification.title}</h4>
                              <button
                                onClick={() => clearNotification(notification.id)}
                                className="flex-shrink-0 p-1 hover:bg-silver/10 rounded transition"
                              >
                                <X className="w-3 h-3 text-silver" />
                              </button>
                            </div>
                            <p className="text-xs text-silver mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-silver/70">
                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                              </span>
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-primary-400 hover:text-primary-300 transition flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  Mark read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
