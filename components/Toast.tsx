export type NotificationType = 'success' | 'warning' | 'danger';
export interface ToastProps {
    type: NotificationType;
    message: string;
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
    const iconColors = {
        success: "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
        warning: "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
        danger: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
    };

    const icons = {
        success: (
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        ),
        warning: (
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
        ),
        danger: (
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        ),
    };

    return (
        <div className={`fixed top-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-900 z-50`} role="alert">
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconColors[type]}`}>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    {icons[type]}
                </svg>
                <span className="sr-only">Icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <button type="button" className={`${onClose ? "" : "hidden"} ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 items-center justify-center dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`} onClick={onClose} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7L1 13" />
                </svg>
            </button>
        </div>
    );
};


export default Toast;
