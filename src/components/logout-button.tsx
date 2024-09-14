import { doLogout } from "@/app/actions"
import { FaArrowCircleRight } from "react-icons/fa"

const Logout = () => {
  return (
    <form action={doLogout} className="w-full">
      <button
        type="submit"
        className="min-w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      >
        <FaArrowCircleRight className="mr-2" />
        Sign Out
      </button>
    </form>
  )
}

export default Logout