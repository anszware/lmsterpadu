import Swal from 'sweetalert2'

export const useAlert = () => {
    const showAlert = (options) => {
        return Swal.fire({
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ef4444',
            ...options
        })
    }

    const toast = (title, icon = 'success') => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: icon, // 'success', 'error', 'warning', 'info'
            title: title
        })
    }

    const dialog = (title, icon = 'success') => {
        Swal.fire({
            icon: icon, // 'success', 'error', 'warning', 'info'
            title: title,
            confirmButtonColor: '#3b82f6',
        })
    }

    const confirm = (title, text, icon = 'warning') => {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: "#3b82f6",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Ya, Lanjutkan!"
        })
    }

    return { showAlert, toast, dialog, confirm }
}
