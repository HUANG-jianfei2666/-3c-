const allPosts = [
    {id:1,author:"数码达人",avatar:"https://picsum.photos/id/1012/100/100",time:"2小时前",tag:"出售",title:"出一台自用iPhone 13 Pro 256G 石墨色 98新",desc:"去年10月买的，一直带壳带膜使用，无任何划痕和磕碰，电池健康92%，原装充电器和盒子都在，价格可小刀，同城可面交。",images:["./img2/苹果13.webp"],likes:128,comments:45,collects:32,views:1256},
    {id:2,author:"电脑爱好者",avatar:"https://picsum.photos/id/1025/100/100",time:"4小时前",tag:"讨论",title:"求推荐5000元左右的游戏本，主要玩原神和LOL",desc:"马上要上大学了，想买一台游戏本，预算5000左右，主要玩原神和LOL，偶尔用用PS和PR，有没有大佬推荐一下？",images:[],likes:89,comments:126,collects:18,views:2341},
    {id:3,author:"耳机发烧友",avatar:"https://picsum.photos/id/1027/100/100",time:"6小时前",tag:"评测",title:"AirPods Pro 2代使用一个月体验分享",desc:"用了一个月的AirPods Pro 2代，对比一代提升还是挺明显的，降噪效果更好了，续航也更长了，不过价格确实有点贵。",images:["./img2/airpospro.webp"],likes:215,comments:78,collects:96,views:3567},
    {id:4,author:"平板用户",avatar:"https://picsum.photos/id/1074/100/100",time:"昨天",tag:"求购",title:"收一台iPad Air 5 64G 蓝色，要求无拆无修",desc:"收一台iPad Air 5 64G 蓝色，要求无拆无修，电池健康90%以上，最好是国行在保的，价格好商量。",images:[],likes:32,comments:15,collects:8,views:876},
    {id:6,author:"避坑达人",avatar:"https://picsum.photos/id/1005/100/100",time:"2天前",tag:"避坑",title:"分享一下我在二手平台被骗的经历，大家引以为戒",desc:"上个月在某二手平台买了一台iPhone 12，结果是翻新机，卖家还拉黑了我，给大家分享一下我的经历，希望大家不要被骗。",images:["./img2/keng.webp"],likes:567,comments:234,collects:456,views:12456},
    {id:7,author:"摄影爱好者",avatar:"https://picsum.photos/id/1014/100/100",time:"2天前",tag:"出售",title:"出一台佳能M50二代微单相机，带15-45镜头",desc:"去年买的佳能M50二代，平时很少用，快门数不到2000，成色95新，带15-45镜头和原装充电器，价格3500。",images:["./img2/jianeng.webp","./img2/jianeng2.webp","./img2/jianeng3.webp"],likes:156,comments:67,collects:43,views:2134},
    {id:8,author:"程序员小王",avatar:"https://picsum.photos/id/1006/100/100",time:"3天前",tag:"讨论",title:"程序员用MacBook还是Windows笔记本好？",desc:"马上要入职了，公司可以自己选电脑，纠结是选MacBook Pro还是ThinkPad，主要做前端开发，偶尔写写Python。",images:[],likes:234,comments:345,collects:89,views:5678},
    {id:11,author:"掌机爱好者",avatar:"https://picsum.photos/id/1074/100/100",time:"5小时前",tag:"求购",title:"收一台Switch OLED 白色，要求箱说全",desc:"收一台自用Switch OLED白色，要求无拆无修、无ban机、摇杆不漂移，箱说全最好，带游戏卡带可以加价，价格好商量，走平台担保交易。",images:[],likes:28,comments:19,collects:7,views:654},
    {id:13,author:"设计师小李",avatar:"https://picsum.photos/id/1006/100/100",time:"昨天",tag:"出售",title:"iPad Pro 12.9寸 2022款 M2 256G 深空灰",desc:"去年买的iPad Pro，本来用来做设计，现在换了笔记本基本不用了，电池健康96%，带Apple Pencil二代和妙控键盘，打包价8500，单出平板6800。",images:["./img2/ipad 12pro.webp"],likes:189,comments:76,collects:54,views:2345},
    {id:14,author:"硬件发烧友",avatar:"https://picsum.photos/id/1083/100/100",time:"2天前",tag:"讨论",title:"现在买二手RTX3060显卡靠谱吗？会不会是矿卡？",desc:"想升级一下电脑显卡，预算1500左右，看了很多二手RTX3060，价格都差不多，但怕买到矿卡。有没有大佬知道怎么分辨矿卡？现在还能买吗？",images:[],likes:123,comments:287,collects:45,views:4567},
];

let currentPage = 1;
const postsPerPage = 3;
let currentFilter = "全部";
let selectedTag = "讨论";
let uploadedImages = [];

const carousel = document.getElementById('carousel');
const carouselItems = carousel.querySelectorAll('.carousel-item');
const indicators = carousel.querySelectorAll('.indicator');
const darkModeBtn = document.getElementById('darkModeBtn');
const postList = document.getElementById('postList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const refreshBtn = document.getElementById('refreshBtn');
const imgPreviewModal = document.getElementById('imgPreviewModal');
const previewImg = document.getElementById('previewImg');
const closePreview = document.getElementById('closePreview');
const tagItems = document.querySelectorAll('.tag-item');
const publishBtn = document.getElementById('publishBtn');
const publishModal = document.getElementById('publishModal');
const closePublish = document.getElementById('closePublish');
const cancelPublish = document.getElementById('cancelPublish');
const submitPublish = document.getElementById('submitPublish');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const tagOptions = document.querySelectorAll('.tag-option');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const uploadPreview = document.getElementById('uploadPreview');

let currentSlide = 0;
let carouselInterval;

function showSlide(index) {
    carouselItems.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    carouselItems[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % carouselItems.length;
    showSlide(nextIndex);
}

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 4000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        stopCarousel();
        showSlide(index);
        startCarousel();
    });
});

carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);
startCarousel();

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

function renderPosts() {
    postList.innerHTML = '';
    let filteredPosts = allPosts;
    if (currentFilter !== "全部") {
        filteredPosts = allPosts.filter(post => post.tag === currentFilter);
    }

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    currentPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.dataset.postId = post.id;

        let imagesHtml = '';
        if (post.images.length > 0) {
            imagesHtml = '<div class="post-images">';
            post.images.forEach(img => {
                imagesHtml += `<img src="${img}" alt="帖子图片" class="post-img">`;
            });
            imagesHtml += '</div>';
        }

        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <img src="${post.avatar}" alt="作者头像" class="author-avatar">
                    <div class="author-info">
                        <div class="author-name">${post.author}</div>
                        <div class="post-time">${post.time}</div>
                    </div>
                </div>
                <div class="post-tag">${post.tag}</div>
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-desc">${post.desc}</p>
                ${imagesHtml}
            </div>
            <div class="post-footer">
                <div class="post-actions">
                    <div class="action-item like-btn">
                        <i class="far fa-heart"></i>
                        <span>${post.likes}</span>
                    </div>
                    <div class="action-item comment-btn">
                        <i class="far fa-comment"></i>
                        <span>${post.comments}</span>
                    </div>
                    <div class="action-item collect-btn">
                        <i class="far fa-star"></i>
                        <span>${post.collects}</span>
                    </div>
                </div>
                <div class="post-view">
                    <i class="far fa-eye"></i>
                    <span class="view-count">${post.views}</span>
                </div>
            </div>
            <div class="post-comment-box" style="display:none;border-top:1px solid #eee;margin-top:10px;padding-top:10px;">
                <div class="comment-list-inner"></div>
                <div class="comment-input-row" style="display:flex;gap:8px;margin-top:10px;">
                    <input type="text" placeholder="写点评论..." class="my-comment-input" style="flex:1;padding:6px 10px;border:1px solid #ddd;border-radius:6px;outline:none;">
                    <button class="send-comment-btn" style="padding:6px 12px;background:#ff7a00;color:#fff;border:none;border-radius:6px;cursor:pointer;">发送</button>
                </div>
            </div>
        `;
        postList.appendChild(postCard);
    });

    updatePagination();
    bindPostEvents();
}

function updatePagination() {
    const filteredPosts = currentFilter === "全部" ? allPosts : allPosts.filter(p => p.tag === currentFilter);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    pageInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPosts();
        postList.scrollIntoView({ behavior: 'smooth' });
    }
});

nextBtn.addEventListener('click', () => {
    const filteredPosts = currentFilter === "全部" ? allPosts : allPosts.filter(p => p.tag === currentFilter);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderPosts();
        postList.scrollIntoView({ behavior: 'smooth' });
    }
});

refreshBtn.addEventListener('click', () => {
    refreshBtn.querySelector('i').style.animation = 'rotate 1s linear infinite';
    refreshBtn.disabled = true;
    setTimeout(() => {
        currentPage = 1;
        renderPosts();
        refreshBtn.querySelector('i').style.animation = 'none';
        refreshBtn.disabled = false;
        postList.scrollIntoView({ behavior: 'smooth' });
    }, 300);
});

publishBtn.addEventListener('click', () => {
    publishModal.style.display = 'flex';
    postTitle.value = '';
    postContent.value = '';
    selectedTag = "讨论";
    tagOptions.forEach(tag => tag.classList.remove('active'));
    document.querySelector('.tag-option[data-tag="讨论"]').classList.add('active');
    uploadedImages = [];
    uploadPreview.innerHTML = '';
});

function closePublishModal() {
    publishModal.style.display = 'none';
}

closePublish.addEventListener('click', closePublishModal);
cancelPublish.addEventListener('click', closePublishModal);
publishModal.addEventListener('click', (e) => {
    if (e.target === publishModal) closePublishModal();
});

tagOptions.forEach(tag => {
    tag.addEventListener('click', () => {
        tagOptions.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        selectedTag = tag.dataset.tag;
    });
});

uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length + uploadedImages.length > 3) {
        alert('最多只能上传3张图片');
        return;
    }
    for (let i = 0; i < files.length; i++) {
        if (uploadedImages.length >= 3) break;
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
            const imgUrl = event.target.result;
            uploadedImages.push(imgUrl);
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${imgUrl}" alt="预览图">
                <span class="delete-img" data-index="${uploadedImages.length - 1}">&times;</span>
            `;
            uploadPreview.appendChild(previewItem);
            previewItem.querySelector('.delete-img').addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                uploadedImages.splice(index, 1);
                previewItem.remove();
                document.querySelectorAll('.delete-img').forEach((btn, idx) => {
                    btn.dataset.index = idx;
                });
            });
        };
        reader.readAsDataURL(file);
    }
});

submitPublish.addEventListener('click', () => {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();
    if (!title) {
        alert('请输入帖子标题');
        return;
    }
    if (!content) {
        alert('请输入帖子内容');
        return;
    }

    const newPost = {
        id: allPosts.length + 1,
        author: "数码爱好者",
        avatar: "https://picsum.photos/id/1005/100/100",
        time: "刚刚",
        tag: selectedTag,
        title: title,
        desc: content,
        images: uploadedImages,
        likes: 0,
        comments: 0,
        collects: 0,
        views: 1
    };
    allPosts.unshift(newPost);
    currentPage = 1;
    renderPosts();
    closePublishModal();
    postList.scrollIntoView({ behavior: 'smooth' });
    alert('发布成功！');
});

function bindPostEvents() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });

    document.querySelectorAll('.collect-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });

    document.querySelectorAll('.post-img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            previewImg.src = img.src;
            imgPreviewModal.style.display = 'flex';
        });
    });

    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const box = this.closest('.post-card').querySelector('.post-comment-box');
            box.style.display = box.style.display === 'none' ? 'block' : 'none';
        });
    });
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('send-comment-btn')) {
        const post = e.target.closest('.post-card');
        const input = post.querySelector('.my-comment-input');
        const val = input.value.trim();
        if (!val) return;
        const html = `<div style="padding:6px 0;border-bottom:1px solid #f5f5f5;"><div style="font-size:14px;color:#333;">用户：${val}</div></div>`;
        post.querySelector('.comment-list-inner').innerHTML += html;
        input.value = '';
    }
});

closePreview.addEventListener('click', () => imgPreviewModal.style.display = 'none');
imgPreviewModal.addEventListener('click', (e) => {
    if (e.target === imgPreviewModal) imgPreviewModal.style.display = 'none';
});

tagItems.forEach((tag) => {
    tag.addEventListener('click', () => {
        tagItems.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        currentFilter = tag.textContent.trim();
        currentPage = 1;
        renderPosts();
    });
});

renderPosts();