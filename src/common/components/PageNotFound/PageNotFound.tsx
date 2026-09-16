import { NavButton } from "@/common/components"
import { containerLinkButton } from "@/common/styles"
import styles from "./PageNotFound.module.css"
import { Link } from "react-router"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <NavButton component={Link} to="/" sx={containerLinkButton}>
      ВЕРНУТЬСЯ НА ГЛАВНУЮ
    </NavButton>
  </>
)
