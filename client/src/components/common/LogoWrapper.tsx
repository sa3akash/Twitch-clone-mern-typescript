import { Link } from "react-router-dom"
import Logo from "../../assets/image/logo.png"

const LogoWrapper = () => {
  return (
    <Link to="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src={Logo}
          alt="logo"
        />
        Twitch Clone
      </Link>
  )
}

export default LogoWrapper