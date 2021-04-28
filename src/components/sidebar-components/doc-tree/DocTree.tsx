import { observer } from 'mobx-react-lite';
/** Components */
import Item from '../item/Item';
import { DirectoryItem } from '../../../mobx/data/directory-store';

/** Styles */
import styles from './DocTree.module.scss';

interface DocTreeProps {
  data: DirectoryItem;
}

const DocTree: React.FC<DocTreeProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <Item item={data}>
        {data.childrens && data.childrens.map((item) => <DocTree data={item} />)}
      </Item>
    </div>
  );
};

export default observer(DocTree);
