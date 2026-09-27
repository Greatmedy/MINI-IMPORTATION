// Toast rendering lives inside ToastContext.jsx (it owns its own portal-like
// container so any component can call useToast().showToast(...) without
// having to mount anything here). This file is kept as the documented
// component entry point referenced by the project structure.
export { useToast as default } from "../context/ToastContext.jsx";
