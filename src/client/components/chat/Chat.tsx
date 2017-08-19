import { h, Component } from 'preact';
import AddComment from './AddComment';
import CommentList from './CommentList';
import { CrocStateComment } from '../Crocodile'


interface ChatProps {
	comments: Map<String, CrocStateComment>;
	onCommentAdd(value: string): void;
	onCommentLike(id: String): void;
	onCommentDislike(id: String): void;
};

type ChatState = void;


class Chat extends Component<ChatProps, ChatState> {
	
	public render(
		{comments, onCommentAdd, onCommentLike, onCommentDislike}: ChatProps
	): JSX.Element {
		return (
			<div id="chat">
				<CommentList
					comments={comments}
					onCommentLike={onCommentLike}
					onCommentDislike={onCommentDislike}
				/>
				<AddComment onCommentAdd={onCommentAdd} />
			</div>
		);
	}

}

export {
	Chat as default,
}


