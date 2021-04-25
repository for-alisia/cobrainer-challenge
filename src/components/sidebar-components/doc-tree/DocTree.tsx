/** Components */
import Item from '../item/Item';

/** Models */
import { DirectoryItem } from '../../../models/directories.models';

/** Styles */
import styles from './DocTree.module.scss';

interface DocTreeProps {
  data: DirectoryItem[] | null;
}

const DocTree: React.FC<DocTreeProps> = ({ data }) => {
  if (!data) return null;
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

export default DocTree;
