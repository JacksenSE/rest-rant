const React = require('react')
const Def = require('../default')

function show (data) {
    let comments = (
        <h3 className='inactive'>
            No comments yet!
        </h3>
    )
    let rating = (
        <h3 className='inactive'>
            Not yet rated
        </h3>
    )
    if (data.place.comments.length) {
        let sumRatings = data.place.comments.reduce((tot, c) => {
            return tot + c.stars
        }, 0)
        let averageRating = sumRatings / data.place.comments.length
        rating = (
            <h3>
                {Math.round(averageRating)} stars
            </h3>
        )
        comments = data.place.comments.map(c => {
            return (
                <div className='border col-sm-4'>
                    <h2 className='rant'>{c.rant ? 'Rant!' : 'Rave!'} </h2>
                    <h4>{c.content}</h4>
                    <h3>
                        <strong>- {c.author}</strong>
                    </h3>
                    <h4>Rating: {c.stars}</h4>
                </div>
            )
        })
    }
    return (
        <Def>
          <main>
            <div>  
                <h1>
                { data.place.name }
                </h1>
                <h3>
                    Located in {data.place.city}, {data.place.state}
                </h3>
                <h3>
                    {data.place.showEstablished()}
                </h3>
                <h4>
                    Serving {data.place.cuisines}
                </h4>
                <div>   
                    <img src= {data.place.pic} alt={data.place.name} />
                </div> 
                <a href={`/places/${data.id}/edit`} className="btn btn-warning"> 
                Edit
                </a>       
                <form method="POST" action={`/places/${data.id}?_method=DELETE` }> 
                <button type="submit" className="btn btn-danger">
                    Delete
                </button>
                </form>
                <hr />
                <h2>Rating</h2>
                    <p>{rating}</p> 
            </div>
            <h2>Comments</h2>
                <div className='row'>
                    {comments}
                </div>
                <h2>Got your own Rant or Rave?</h2>
                <form action={`/places/${data.place.id}/comment`} method='POST'>
                    <div className='row'>
                        <div className='form-group col-sm-12'>
                            <label htmlFor='content'>Content</label>
                            <textarea id='content' name='content' className='form-control'></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div>
                            <label htmlFor='author'>Author  </label>
                            <input id='author' name='author' />
                        </div>
                        <div>
                            <label htmlFor='stars' className='form-label'>Star Rating</label>
                            <input type='range' step='0.5' min='1' max='5' id='stars' name='stars' list='tickmarks' />
                            <datalist id='tickmarks'>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </datalist>
                        </div>
                        <div className='form-check'>
                            <label htmlFor='rant'>Rant?  </label>
                            <input type='checkbox' id='rant' name='rant' />
                        </div>
                    </div>
                    <input type='submit' className='btn btn-primary' value='Add Comment' />
                </form>
          </main>
        </Def>
    )
}

module.exports = show