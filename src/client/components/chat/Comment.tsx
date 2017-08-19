import { h, Component } from 'preact';
import { CrocStateComment } from '../Crocodile'

interface CommentProps {
	comment: CrocStateComment;
	onLike(): void;
	onDislike(): void;
}

class Comment extends Component<CommentProps, void> {
	public render( {comment, onLike, onDislike}: CommentProps ) : JSX.Element {
		return (
			<li class="list-group-item align-bottom justify-content-between">
				<label>{comment.text}</label>
				<div>
				<i
					class={`fa fa-thumbs-o-down fa-lg ${comment.rating < 0? 'actived' : ''}`}
					onClick={() => onDislike()}
					aria-hidden="true"
				/>
				<i
					class={`fa fa-thumbs-o-up fa-lg ${comment.rating > 0? 'actived' : ''}`}
					onClick={() => onLike()}
					aria-hidden="true"
				/>
				</div>
			</li>
		)
	}
}

export {
	Comment as default
}
