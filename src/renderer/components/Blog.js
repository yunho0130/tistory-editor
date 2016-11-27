import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import Sidebar from './Sidebar'
import Content from './Content'

class Blog extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			posts: [],
			currentPost: {}
		}

		ipcRenderer.on("receive-posts", (e, posts) => {
			console.log(posts)
			this.addPosts(posts)
		})
	}

	addPosts(receivedPosts) {
		const { posts } = this.state
		let newPosts = posts.slice()
		newPosts.push(...receivedPosts)
		this.setState({
			posts: newPosts
		})
	}

	componentDidMount() {
		const { currentBlog } = this.props
		ipcRenderer.send("fetch-posts", currentBlog.name)
	}

	handleSelectBlog(blog) {
		this.props.onSelect(blog)
	}

	handleSelectPost(post) {
		this.setState({
			currentPost: post
		})
	}

	render() {
		const { user, currentBlog } = this.props
		const { posts, currentPost } = this.state

		return (
			<div className="container">
				<Sidebar user={user} currentBlog={currentBlog} posts={posts} currentPost={currentPost}
					onSelectBlog={this.handleSelectBlog.bind(this)}
					onSelectPost={this.handleSelectPost.bind(this)} />
				<Content post={currentPost} onSave={() => {}} />
			</div>
		)
	}
}

Blog.propTypes = {
	user: PropTypes.object.isRequired,
	currentBlog: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired
}

export default Blog
