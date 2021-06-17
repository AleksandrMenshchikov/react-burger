import React from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { RootState } from '../../services/reducers';
import styles from './BurgerConstructorScrolle.module.css';
import BurgerConstructorItem from '../burger-constructor-item/BurgerConstructorItem';

function BurgerConstructorScrolle() {
  const { data } = useSelector((state: RootState) => state.burgerConstructor);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'burgerConstructorItem',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  let containerInnerAtive;
  if (canDrop && !isOver) {
    containerInnerAtive = styles.listScrolle_canDrop;
  } else if (canDrop && isOver) {
    containerInnerAtive = styles.listScrolle_isOver;
  }

  return (
    <div ref={drop} className={`${styles.listScrolle} ${containerInnerAtive}`}>
      {data.length > 0 && data.map((item) => {
        if (item.type !== 'bun') {
          return <BurgerConstructorItem ingredient={item} position="center" key={item._id} />;
        }
        return null;
      })}
    </div>
  );
}

export default React.memo(BurgerConstructorScrolle);
