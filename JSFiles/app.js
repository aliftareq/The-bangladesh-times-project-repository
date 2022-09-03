// All Js code for news portal for here
console.log('app js connected')


/*-------------------------All arrow functions--------------------*/

//loading catagories
const loadCatagory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
        .catch(error => {
            alert('you have a wrong api link', error)
        })
}

//displaying catagories
const displayCatagory = (catagories) => {
    //console.log(catagories)
    const newsCatagories = document.getElementById('news-catagories')
    catagories.forEach(catagory => {
        //console.log(catagory)
        const catagoryName = document.createElement('li');
        catagoryName.classList.add('nav-item')
        catagoryName.innerHTML = `
        <p onclick="loadNews('${catagory.category_id}')" class="nav-link active fw-bold" aria-current="page">${catagory.category_name}</p>
        `;
        newsCatagories.appendChild(catagoryName)
    })
}

//loading news with its id
const loadNews = (categoryId) => {
    //start spinning
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => disPlayNews(data.data))
        .catch(error => {
            alert('you have an wrong API', error)
        })
}

//displaying news with event handler
const disPlayNews = (newses) => {
    //console.log(newses)
    // sorting newes according to their view.
    const sortNewses = newses.sort(function (a, b) {
        return a.category_id.localeCompare(b.category_id) || b.total_view - a.total_view;
    });
    //news number
    const newsNumber = document.getElementById('item-number')
    if (sortNewses.length > 0) {
        newsNumber.innerText = `${sortNewses.length} items found for  this category`
    }
    else {
        newsNumber.innerText = `No news item found for this catagory`
    }
    const newsContainer = document.getElementById('newsContainer')
    newsContainer.innerHTML = ``;
    sortNewses.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement("div")
        newsDiv.innerHTML = `
        <div onclick="loadNewsDetails('${news._id}')" class="card mb-3" style="width: 100%;" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 320)}.............<b>read the full stroy</b></p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${news.author.img}" width="40" height="40" alt="">
                        <div class="mx-2">
                            <b>${news.author.name ? news.author.name : 'No data found'}</b> <br>
                            ${news.author.published_date ? news.author.published_date : 'No data found'}
                        </div>
                    </div>
                    <div class="fw-bold">
                        <i class="fa-solid fa-eye"></i>
                        ${news.total_view ? news.total_view : 'No data found'}
                    </div>
                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        `
        newsContainer.appendChild(newsDiv)
    })
    //stop spinning
    toggleSpinner(false)
}

//spinning decalarebale function
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

//newsDetailsloading function declared here
const loadNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(error => {
            alert('you have an API error', error)
        })
}

// displaying newsDetails with help of event handlar
const displayNewsDetails = (newsDetails) => {
    console.log(newsDetails, 'paichi')
    const newsModal = document.getElementById('newsModalBody')
    newsModal.innerHTML = ``;
    newsModal.innerHTML = `
    <h4 class="text-center">${newsDetails.title ? newsDetails.title : 'No data found'}</h4> <br>
    <div class="d-flex justify-content-center">
        <img src="${newsDetails.thumbnail_url ? newsDetails.thumbnail_url : 'No data found'}" width="300" height="200" alt="">
    </div> <br>
    <div>
    <p>Reporter : <b>${newsDetails.author.name ? newsDetails.author.name : 'No data found'}</b></p>
    <p>${newsDetails.details ? newsDetails.details : 'No data found'}</p>
    </div>
    <div>
        <b>Share in your time line:</b> <br>
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-facebook-messenger"></i>
        <i class="fa-brands fa-whatsapp"></i>
        <i class="fa-brands fa-google-plus-g"></i>
    </div>
    `
}
//calling a the main functions
loadNews('01')
loadCatagory()
