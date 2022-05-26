const rootEl = document.getElementById('root') // select the root element
const notificationApp = document.createElement('div') // create a div element
const app__wrapper = document.createElement('div') // create a div element
const app__title = document.createElement('span') // create a h1 element
const product__container = document.createElement('div') // create a div element

const link = document.createElement('link')
link.setAttribute('rel', 'stylesheet')
link.setAttribute('type', 'text/css')
link.setAttribute(
  'href',
  'https://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,700',
)
document.head.appendChild(link)

// Jquery add
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    script.onload = () => resolve(script)
    script.onerror = () => reject(new Error(`Script load error for ${src}`))
    document.head.append(script)
  })
}
let promiseJquery = loadScript('https://code.jquery.com/jquery-3.6.0.min.js')
promiseJquery.then(() => appSetup())

// Fontawesome icons
const head = document.querySelector('head')
const script = document.createElement('script')
script.src = 'https://kit.fontawesome.com/f1291bfce0.js'
script.crossOrigin = 'anonymous'
head.appendChild(script)

// Get Products from the WEB
const hostIn = window.location.hostname == 'www.lcwaikiki.com'
let productData =
  localStorage.getItem('productData') !== null
    ? JSON.parse(localStorage.getItem('productData'))
    : []


// Count +=1 for each product
let multiProduct = false

if (productData !== []) {
  productData.forEach((product) => {
    product.url === window.location.href ? (product.count += 1) : null
    product.url === window.location.href ? (multiProduct = true) : null

  })
}
productData.sort((a, b) => (a.count < b.count ? 1 : -1))
console.log(productData)
let url
let img
let title
let desc
let count
//* Bug FİX */
const navigatorStart = window.location.href
const navigatorLinkStart = navigatorStart.includes(
  'lcwaikiki.com/tr-TR/TR/urun/',
)
/* Bug FİX */
if (hostIn && !multiProduct && navigatorLinkStart) {
  url = window.location.href
  img = document.querySelector('.product-large-image').src
  title = document.querySelector('.product-title').innerText
  desc = document.querySelector('.panel-body>.row>.col-xs-12>ul>li').innerText
  const tempObject = {
    url: url,
    img: img,
    title: title,
    desc: desc,
    count: 1,
  }
  productData.push(tempObject)
}
localStorage.setItem('productData', JSON.stringify(productData))

function appSetup() {
  // notification__app
  rootEl.appendChild(notificationApp) // append the div to the root element
  notificationApp.classList.add('notification__app') // add a class to the div (notification__app)

  // Style the notification__app
  const notification__app_style = {
    display: 'flex',
    position: 'fixed',
    fontFamily: "'Open Sans', sans-serif",
    top: 'calc(40% - 11rem)',
    right: 0,
    maxWidth: '500px',
    background:
      'linear-gradient(270deg, rgba(186,198,237,1) 19%, rgba(113,141,231,1) 100%)',
    borderTopLeftRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    color: '#fff',
    zIndex: '9999',
    overflow: 'hidden',
    display: 'none',
  }
  Object.assign(notificationApp.style, notification__app_style)

  // app__wrapper
  notificationApp.appendChild(app__wrapper) // append the div to the notification__app
  app__wrapper.classList.add('app__wrapper') // add a class to the div (app__wrapper)

  // Style the app__wrapper
  const app__wrapper_style = {
    display: 'flex',
    flexDirection: 'column',
    margin: '15px 0',
    transition: 'all 1.3s ease-in-out',
  }
  Object.assign(app__wrapper.style, app__wrapper_style)

  // App wrapper header
  const app__wrapper_header = document.createElement('div') // create a div element
  app__wrapper.appendChild(app__wrapper_header) // append the div to the app__wrapper
  app__wrapper_header.classList.add('app__wrapper_header') // add a class to the div (app__wrapper_header)

  // Style the app__wrapper_header
  const app__wrapper_header_style = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px 15px',
  }
  Object.assign(app__wrapper_header.style, app__wrapper_header_style)

  // app__title
  app__wrapper_header.appendChild(app__title) // append the h1 to the app__wrapper_header
  app__title.classList.add('app__title') // add a class to the h1 (app__title)
  app__title.innerText = 'Flash Sale' // set the text of the h1

  // Style the app__title
  const app__title_style = {
    display: 'flex',
    fontSize: '22px',
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: '0px 0px 10px 0px',
  }
  Object.assign(app__title.style, app__title_style)

  // Style the openNotification
  const openNotification = document.createElement('div') // create a div element
  rootEl.appendChild(openNotification) // append the div to the notification__app
  openNotification.classList.add('openNotification') // add a class to the div (openNotification)
  openNotification.innerHTML = '<i class="fa-solid fa-bell"></i>' // set the icon of the div

  // Style the openNotification
  const openNotification_style = {
    display: 'flex',
    position: 'fixed',
    top: 'calc(40% - 11rem + 15px)',
    right: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    color: '#fff',
    border: '1px solid #fff',
    background:
      'linear-gradient(270deg, rgba(142,161,221,1) 0%, rgba(113,141,231,1) 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    cursor: 'pointer',
    zIndex: '9999',
  }
  Object.assign(openNotification.style, openNotification_style)
  // Close the notification__app
  const closeNotification = document.createElement('span') // create a span element
  app__wrapper_header.appendChild(closeNotification) // append the span to the app__wrapper_header
  closeNotification.classList.add('closeNotification') // add a class to the span (closeNotification)
  closeNotification.innerHTML = '<i class="fa-solid fa-xmark"></i>' // set the text of the span

  // Style the closeNotification
  const closeNotification_style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '1px solid #fff',
    background:
      'linear-gradient(270deg, rgba(142,161,221,1) 0%, rgba(113,141,231,1) 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    cursor: 'pointer',
  }
  Object.assign(closeNotification.style, closeNotification_style)

  // Close Icon
  const closeIcon = document.querySelector('.fa-xmark')
  const closeIcon_style = {
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer',
    alignSelf: 'center',
    fontWeight: 'thin',
  }
  Object.assign(closeIcon.style, closeIcon_style)

  // product__container
  app__wrapper.appendChild(product__container) // append the div to the app__wrapper
  product__container.classList.add('product__container') // add a class to the div (product__container)

  // Style the product__container
  const product__container_style = {
    display: 'flex',
    flexDirection: 'column',
  }
  Object.assign(product__container.style, product__container_style)

  // product
  for (let i = 0; i < 3; i++) {
    const product = document.createElement('div') // create a div element
    product.classList.add('product') // add a class to the div (product)
    product.innerHTML = `
    <div class="product__image">
        <img class="notification_image" src=${productData[i].img} alt="product" />
    </div>
    <div class="product__content">
        <span class="product__content_title">${productData[i].title}</span>
        <p class="product__content_description">${productData[i].desc}</p>
        <a href=${productData[i].url} target="_blank" class="product__content_link">View Product</a>
    </div>
`
    product__container.appendChild(product) // append the div to the product__container

    // Style the product
    const product_style = {
      display: 'flex',
      flexDirection: 'row',
    }
    Object.assign(product.style, product_style)
    // Style the product__image
    const image_style = {
      width: '65px',
      height: 'auto',
      objectFit: 'cover',
      margin: '0rem 1rem 1rem 1rem',
      borderRadius: '0.5rem',
    }
    Object.assign(
      product.querySelector('.notification_image').style,
      image_style,
    )
    // Style the product__content
    const content_style = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
    }
    Object.assign(
      product.querySelector('.product__content').style,
      content_style,
    )
    // Style the product__content_title
    const title_style = {
      fontSize: '1.5rem',
      fontWeight: 'medium',
      paddingRight: '10px',
      margin: '0px !important',
      margin: '0.2rem 0.5rem !important',
    }
    Object.assign(
      product.querySelector('.product__content_title').style,
      title_style,
    )
    // Style the product__content_description
    const description_style = {
      color: '#eee',
      visitid: 'none',
      margin: '0px !important',
      marginRight: '10px',
      opacity: '0.8',
    }
    Object.assign(
      product.querySelector('.product__content_description').style,
      description_style,
    )
    // Style the product__content_link
    const link_style = {
      display: 'flex',
      alignSelf: 'flex-end',
      margin: '0px 10px 10px 0px',
      color: '#e3f6f5',
      textDecoration: 'none',
      textTransform: 'uppercase',
      padding: '5px',
      border: '1px solid #e3f6f5',
      borderRadius: '5px',
    }
    Object.assign(
      product.querySelector('.product__content_link').style,
      link_style,
    )
  }

  $('.closeNotification').click(function () {
    if ($('.openNotification').css('display') == 'none') {
      $('.notification__app').hide('slide', 'swing')
      openNotification.style.display = 'flex'
    }
  })
  $('.openNotification').click(function () {
    if ($('.openNotification').css('display') == 'flex') {
      $('.notification__app').show('slide', 'swing')
      openNotification.style.display = 'none'
    }
  })
  // Find the location of the web page and hide the notification__app on product page
  const navigator = window.location.href
  const navigatorLink = navigator.includes('lcwaikiki.com/tr-TR/TR/urun/')
  if (navigatorLink) {
    openNotification.style.display = 'none'
    closeNotification.style.display = 'none'
  }
}
