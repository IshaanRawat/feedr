var blogName = '';
$(".subtopics-list li").click(function(event) {
    blogName = $(this).attr("class");
    var Blog = React.createClass({
    render: function () {
        return (
            <div className="chain">
                {this.props.data.map(verge => (
                    <article className="post" key={verge.publishedAt}>
                        <a href={verge.url} >
                            <img src={verge.urlToImage} alt="" />
                            <div className="post-about">
                                <h1>{verge.title}</h1>
                                <div className="post-details">
                                    <div className="post-author">{verge.author}</div>
                                </div>
                            </div>
                        </a>
                    </article>
                ))}
            </div>
        );
    }
});

var BlogPosts = React.createClass({
    componentDidMount: function () {
        $.ajax({
            url: 'https://newsapi.org/v1/articles?source='+blogName+'&sortBy=top&apiKey=cf64c0d4360e4ebe85862e3972923f1c',
            cache: false,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data.articles});
            }.bind(this),
            error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
        });
    },
    getInitialState: function () {
		return {data: []};
	},
    render: function () {
        return (
            <Blog data={this.state.data} />
        );
    }
});


ReactDOM.render(
    <BlogPosts />, document.getElementById('post-area')
);

$("nav").css('width', '0px');
$("#nav-control").html("<i class='fa fa-bars' aria-hidden='true'></i>");
});
