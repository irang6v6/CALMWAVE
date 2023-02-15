import { AiOutlineUnorderedList } from "react-icons/ai"
import { IoDocumentOutline, IoStar } from "react-icons/io5"
import { BsCheck2Square, BsArrowRepeat } from "react-icons/bs"
import { FaCarrot } from "react-icons/fa"
import { FaCat } from "react-icons/fa"
import { IoIosHeart } from "react-icons/io"
import { GiBaseballBat, GiPumpkinLantern } from "react-icons/gi"
const CateIcon = ({ value, className }) => {
  switch (value) {
    case 1:
      return <AiOutlineUnorderedList className={className} />
    case 2:
      return <IoDocumentOutline className={className} />
    case 3:
      return <BsCheck2Square className={className} />
    case 4:
      return <IoStar className={className} />
    case 5:
      return <BsArrowRepeat className={className} />
    case 6:
      return <FaCarrot className={className} />
    case 7:
      return <FaCat className={className} />
    case 8:
      return <IoIosHeart className={className} />
    case 9:
      return <GiBaseballBat className={className} />
    case 10:
      return <GiPumpkinLantern className={className} />
    default:
      return null
  }
}

export default CateIcon
