import { AiOutlineUnorderedList } from "react-icons/ai"
import { IoDocumentOutline, IoStar } from "react-icons/io5"
import { BsCheck2Square, BsArrowRepeat } from "react-icons/bs"
import { FaCarrot } from "react-icons/fa"
import { FaCat } from "react-icons/fa"
import { IoIosHeart } from "react-icons/io"
import { GiBaseballBat, GiPumpkinLantern } from "react-icons/gi"
const CateIcon = ({ value }) => {
  switch (value) {
    case 1:
      return <AiOutlineUnorderedList />
    case 2:
      return <IoDocumentOutline />
    case 3:
      return <BsCheck2Square />
    case 4:
      return <IoStar />
    case 5:
      return <BsArrowRepeat />
    case 6:
      return <FaCarrot />
    case 7:
      return <FaCat />
    case 8:
      return <IoIosHeart />
    case 9:
      return <GiBaseballBat />
    case 10:
      return <GiPumpkinLantern /> 
    default:
      return null
  }
}

export default CateIcon
