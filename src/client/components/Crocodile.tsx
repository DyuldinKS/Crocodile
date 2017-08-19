import { Component, h } from 'preact';
import Chat from './chat/Chat';
import Canvas from './sketcher/Canvas';

interface CrocStateComment {
	text: string;
	rating: number;
}

interface CrocodileState {
	comments: Map<String, CrocStateComment>;
};

type CrocodileProps = Object;


class Crocodile extends Component<CrocodileProps, CrocodileState> {
	
	constructor(_props: CrocodileProps) {
		super(_props);
		this.state.comments = new Map();
	}

	public render(
			_props: CrocodileProps,
			{comments}: CrocodileState
		): JSX.Element {
		return (
			<div>
				<Canvas />
				<Chat
					comments={comments}
					onCommentAdd={this.onCommentAdd}
					onCommentLike={this.onCommentLike}
					onCommentDislike={this.onCommentDislike}
				/>
			</div>
		)
	}

	private rate(id: String, rating: number) {
		const comments = new Map(this.state.comments);
		const comment = comments.get(id);
		comments.set(id, {...comment, rating});
		this.setState( {comments} );
	}

	private onCommentLike = (id: String): void => {
		const comment = this.state.comments.get(id);
		comment && this.rate(id, comment.rating === 1? 0 : 1);
	}

	private onCommentDislike = (id: String): void => {
		const comment = this.state.comments.get(id);
		comment && this.rate(id, comment.rating === -1? 0 : -1);
	}

	private onCommentAdd = (value: string): void => {
		const comments = new Map(this.state.comments);
		comments.set(this.uuid(), { text: value, rating: 0 });
		this.setState( {comments} );
	}

	private uuid() {
		let uuid = '';
		for (let i=0; i<32; i++) {
			let random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
		}
		return uuid;
	}
}

export {
	Crocodile as default,
	CrocStateComment
}