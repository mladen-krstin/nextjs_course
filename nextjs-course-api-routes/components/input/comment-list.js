import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.newComment.text}</p>
          <div>
            By <address>{item.newComment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
