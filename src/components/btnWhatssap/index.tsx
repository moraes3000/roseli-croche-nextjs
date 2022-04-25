import styles from './styles.module.css'
import { IoLogoWhatsapp } from "react-icons/io";

interface whatMensagemProps {
  phone: number;
  msg: string
}

export default function BtnWhatssap(whats: whatMensagemProps) {
  return (
    <>
      <div className={styles.container}>
        <a target='_blank' href={`https://api.whatsapp.com/send?phone=${whats.phone}&text=${whats.msg}`} rel="noreferrer">
          <IoLogoWhatsapp fill={'#45c153'} />
        </a>
      </div>

    </>
  )
}