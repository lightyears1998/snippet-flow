import styles from "./Post.module.css";

type PostHeadlineProps = {
  headline: string
  level: number
  expand: boolean
  setExpand: (boolean) => void
}

const ToggleExpandButton = ({ expand, setExpand }: Partial<PostHeadlineProps>) => {
  return <span className={styles["headline-toggle-button"]} onClick={() => setExpand(!expand)}>{expand ? "-" : "+"}</span>;
};

export const PostHeadline = ({
  headline, level, expand, setExpand
} : PostHeadlineProps) => {
  if (level === 0) {
    return <h1 className={styles.headline}><ToggleExpandButton expand={expand} setExpand={setExpand}/> {headline}</h1>;
  } else if (level === 1) {
    return <h2 className={styles.headline}><ToggleExpandButton expand={expand} setExpand={setExpand} /> {headline}</h2>;
  } else if (level === 2) {
    return <h3 className={styles.headline}><ToggleExpandButton expand={expand} setExpand={setExpand} /> {headline}</h3>;
  }

  return <h4 className={styles.headline}><ToggleExpandButton expand={expand} setExpand={setExpand} /> {headline}</h4>;
};
