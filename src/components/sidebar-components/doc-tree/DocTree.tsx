import { observer } from 'mobx-react-lite';
/** Components */
import Item from '../item/Item';
import { DirectoryItem } from '../../../mobx/data/directory-store';

/** Styles */
import styles from './DocTree.module.scss';

interface DocTreeProps {
  data: DirectoryItem[] | null;
}

const DocTree: React.FC<DocTreeProps> = ({ data }) => {
  if (!data) return null;
  console.log('re-render from tree');
  console.log(data);
  return (
    <div className={styles.wrapper}>
      {data.map((item) => {
        if (item.type === 'file') {
          return <Item item={item} key={item.name} type="file" />;
        }

        if (item.type === 'folder') {
          return (
            <Item item={item} key={item.name} type="folder">
              <DocTree data={item.childrens ? item.childrens : null} />
            </Item>
          );
        }

        return null;
      })}
    </div>
  );
};

export default observer(DocTree);
