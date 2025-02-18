import toast from "react-hot-toast"


export const Toast = (text: string, type: 'success' | 'error' | 'loading') => {
    if (type === 'success') {
        toast.success(text, {
        })
    } else if (type === 'error') {
        toast.error(text)
    } else if (type === 'loading') {
      toast.loading(text)
    }
    setTimeout(() => { 
        toast.dismiss()
    }, 3000)
 }