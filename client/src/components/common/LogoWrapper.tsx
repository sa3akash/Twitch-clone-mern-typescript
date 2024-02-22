import Logo from "../../assets/image/logo.png"

const LogoWrapper = () => {
  return (
    <div
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src={Logo}
          alt="logo"
        />
        Twitch Clone
      </div>
  )
}

export default LogoWrapper