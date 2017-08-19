import { h, Component } from 'preact';
import Comment from './Comment'
import { CrocStateComment } from '../Crocodile'

interface CommentListProps {
	comments: Map<String, CrocStateComment>;
	onCommentLike(id: String): void;
	onCommentDislike(id: String): void;
}

class CommentList extends Component<CommentListProps, void> {

	private lastComment: Comment;

	public componentDidMount() {
		if(this.lastComment) {
			this.lastComment.base.scrollIntoView();
		}
	}

	public componentDidUpdate() {
		this.lastComment.base.scrollIntoView();
	}

	public render(
		{comments, onCommentLike, onCommentDislike}: CommentListProps
	): JSX.Element {

		return (
			<div id="commentList" class="row">
				<ul class="list-group col-md-12">
					{Array.from(comments.entries()).map(
						([id, comment]) => (
							<Comment
								key={id}
								comment={comment}
								onLike={() => onCommentLike(id)}
								onDislike={() => onCommentDislike(id)}
								ref={this.refLastComment}
							/>
						)
					)}
				</ul>
			</div>
		);
	}

	public refLastComment = (element: Comment): void => {
		this.lastComment = element;
	}

}

export default CommentList;