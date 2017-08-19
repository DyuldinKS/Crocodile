import { h, Component } from 'preact';

interface AddCommentProps {
	onCommentAdd( value: string ): void;
}

type AddCommentState = void;

class AddComment extends Component<AddCommentProps, AddCommentState> {

	private input: HTMLInputElement;

	public componentDidMount() {
		this.input.focus();
	}

	public render() {
		return (
			<div id="addComment" class="row">
				<form class="input-group" onSubmit={this.onSubmit}>
					<input
						type="text"
						class="form-control"
						placeholder="your option"
						ref={this.refInput}
					/>
					<span class="input-group-btn">
						<button class="btn btn-secondary" type="submit">
							Send
						</button>
					</span>
				</form>
			</div>
		);
	}

	private refInput = ( element: HTMLInputElement ): void => {
		this.input = element;
	}
	
	private onSubmit = (event: Event): void => {
		event.preventDefault();
		const value = this.input.value.trim();
		if(value) {
			this.props.onCommentAdd( value );
			this.input.value = '';
		}
		this.input.focus();
	}

}

export {
	AddComment as default,
	AddCommentProps,
	AddCommentState,
}