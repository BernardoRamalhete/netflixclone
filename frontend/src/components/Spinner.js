function Spinner(props) {

  return (
    <>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: `${props.bgColor}`
      }}>
        <div style={{
          width: '20%'
        }}>

          <img src={props.imgSrc} alt='loading' />

        </div>

      </div>

    </>
  )
}

export default Spinner