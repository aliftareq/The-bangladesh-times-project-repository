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
        const catagoryName = document.createElement('div');
        catagoryName.innerHTML = `
        <p onclick="loadNews('${catagory.category_id}')" class="fw-bold">${catagory.category_name}</p>
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
    //console.log(newses)
    const sortNewses = newses.sort(function (a, b) {
        return a.category_id.localeCompare(b.category_id) || b.total_view - a.total_view;
    });
    sortNewses.forEach(news => {
        console.log(news)
    })
}

loadCatagory()