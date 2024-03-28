import { React } from 'react'
import Lottie from 'lottie-react'
import loadingjson from '../lottie/loading.json'
const Loading = () => {
  return <Lottie animationData={loadingjson} loop={true} width={20} className="loading" />
}

export default Loading
