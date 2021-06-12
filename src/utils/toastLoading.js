import { Toast } from 'vant'

export const ToastLoadingStart = () => {
  Toast.loading({
    duration: 0, // 持续展示
    forbidClick: true,
    loadingType: 'spinner', // 加载的样式
    message: '加载中...'
  })
}

export const ToastLoadingEnd = () => {
  Toast.clear()
}
