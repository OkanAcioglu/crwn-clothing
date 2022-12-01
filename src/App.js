const App = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
    },
    {
      id: 2,
      title: 'Jackets',
    },
    {
      id: 3,
      title: 'Sneakers',
    },
    {
      id: 4,
      title: 'Womens',
    },
    {
      id: 5,
      title: 'Mans',
    },
  ]

  return (
    <div className='categories-container'>
      {categories.map(({ title }) => (
        <div className='category-container'>
          <div className='background-image' />
          <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
      {/* <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Hats</h2>
          <p>Shop Now</p>
        </div>
      </div>
      <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Jackets</h2>
          <p>Shop Now</p>
        </div>
      </div>
      <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Sneakers</h2>
          <p>Shop Now</p>
        </div>
      </div>
      <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Womens</h2>
          <p>Shop Now</p>
        </div>
      </div>
      <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Mans</h2>
          <p>Shop Now</p>
        </div>
      </div> */}
    </div>
  )
}

export default App
