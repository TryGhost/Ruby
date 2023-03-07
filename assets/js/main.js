(function () {
    pagination(true);
    const share = document.querySelector('.social-media-share')
    const shareList = document.querySelector('.share-list')
    const shareMedia = document.querySelector('.social-media')
    
    share &&  share.addEventListener('click', (event) => {
        shareList.style.display = 'block'
        event.stopPropagation()
    })
    window.addEventListener('click', (event) => {
        if(!shareList) return
        if(shareList.style.display === 'block')  {
            shareList.style.display = 'none'
        }
    })
    const throttle = (fn, wait = 500) => {
        let timer = null,
          last;
        return function (...args) {
          const now = +new Date();
          if (last && now < last + wait) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              last = now;
              fn.apply(this, args);
            }, wait);
          } else {
            last = now;
            fn.apply(this, args);
          }
        };
    }
    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        if(!shareMedia || scrollTop > 0 && shareMedia.style.display === 'flex') return
        if (scrollTop > 0) {
            shareMedia.style.display = 'flex'
        }
        else if (scrollTop === 0) {
            shareMedia.style.display = 'none'
        }
    }
    window.addEventListener('scroll', throttle(handleScroll))
})();
