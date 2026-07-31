import styles from './Resume-TOC.module.css'

const Page = () => (
  <ol className={styles.tocList}>
    <li>
      <a href="#Summary">Summary</a>
    </li>
    <li>
      <a href="#Technology">Technology</a>
    </li>
    <li>
      <a href="#Work-Experience">Work Experience</a>
    </li>
    <li>
      <a href="#Publications-Recognition">Publications &amp; Recognition</a>
    </li>
    <li>
      <a href="#Education">Education</a>
    </li>
  </ol>
)
export default Page
