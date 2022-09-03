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

const loadNews = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => disPlayNews(data.data))
        .catch(error => {
            alert('you have an wrong API', error)
        })
}

const disPlayNews = (newses) => {
    toggleSpinner(true)
    //console.log(newses)
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
    const newsContainer = document.getElementById('newContainer')
    newsContainer.innerHTML = ``;
    sortNewses.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement("div")
        newsDiv.innerHTML = `
        <div class="card mb-3" style="width: 100%;">
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
                            <b>${news.author.name ? news.author.name : 'No data available'}</b> <br>
                            ${news.author.published_date ? news.author.published_date : 'No data available'}
                        </div>
                    </div>
                    <div class="fw-bold">
                        <i class="fa-solid fa-eye"></i>
                        ${news.total_view ? news.total_view : 'No data available'}
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
    toggleSpinner(false)
}

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}


loadCatagory()