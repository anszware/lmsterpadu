import Swal from 'sweetalert2';

const useAlert = () => {
  const showAlert = (options) => {
    return Swal.fire({
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      ...options
    });
  };
  const toast = (title, icon = "success") => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3e3,
      timerProgressBar: true,
      didOpen: (toast2) => {
        toast2.addEventListener("mouseenter", Swal.stopTimer);
        toast2.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon,
      // 'success', 'error', 'warning', 'info'
      title
    });
  };
  const dialog = (title, icon = "success") => {
    Swal.fire({
      icon,
      // 'success', 'error', 'warning', 'info'
      title,
      confirmButtonColor: "#3b82f6"
    });
  };
  const confirm = (title, text, icon = "warning") => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Ya, Lanjutkan!"
    });
  };
  return { showAlert, toast, dialog, confirm };
};

export { useAlert as u };
//# sourceMappingURL=useAlert-CKkjru5E.mjs.map
