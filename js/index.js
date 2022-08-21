(function header() {
    const query = () => {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest;
            xhr.open("GET", "data.json");
            xhr.onreadystatechange = () => {
                let { readyState, status, responseText } = xhr;
                if (readyState === 4 && status === 200) {
                    data = JSON.parse(responseText);
                    resolve(JSON.parse(responseText));
                };
            };
            xhr.send();
        });
    };


    (async () => {
        let data = await query();
        const header = (function () {
            function headerNavSearchForm() {
                let body = document.body,
                    header = body.querySelector('#header'),
                    headerNavSearch = header.querySelector('.header-nav-Search'),
                    headerNavSearchForm = headerNavSearch.querySelector('.header-nav-Search-form'),
                    headerNavSearchInputColor = headerNavSearch.querySelector('.header-nav-Search-input-color'),
                    headerNavSearchInp = headerNavSearchForm.querySelector('.header-nav-Search-inp'),
                    headerNavSearchInpFoucs = header.querySelector('.header-nav-Search-inp-foucs'),
                    livecastPullLeftList = Array.from(header.querySelectorAll('.livecast-pull-left-List a'));
                headerNavSearchForm.addEventListener("mouseenter", function () {
                    headerNavSearchInputColor.style.opacity = "1";
                });
                headerNavSearchForm.addEventListener("mouseleave", function () {
                    headerNavSearchInputColor.style.opacity = "0.9";
                });

                // 点击下拉框

                function viewModal(e) {
                    stopProp(e);  // 防止事件冒泡导致触发body上绑定的点击事件
                    const disp = headerNavSearchInpFoucs.style.display;
                    headerNavSearchInpFoucs.style.display = "block";
                    headerNavSearchInputColor.style.borderBottomLeftRadius = '0px';
                    headerNavSearchInputColor.style.borderBottomRightRadius = '0px';
                    headerNavSearchInputColor.style.borderBottom = 'none';

                };
                function hideModal() {
                    headerNavSearchInputColor.style.borderBottomLeftRadius = '8px';
                    headerNavSearchInputColor.style.borderBottomRightRadius = '8px';
                    headerNavSearchInpFoucs.style.display = "none";
                };
                function stopProp(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                };

                function headerOnload() {
                    headerNavSearchInp.addEventListener("click", viewModal);
                    body.addEventListener("click", hideModal);
                    headerNavSearchInpFoucs.addEventListener("click", (e) => { stopProp(e); });
                };
                headerOnload()
                function headerNavLivecastPull() {
                    for (let t = 0; t < livecastPullLeftList.length; t += 6) {
                        let group = livecastPullLeftList.slice(t, t + 6)
                        function RandomNum(Min, Max) {
                            let num = Min + Math.floor(Math.random() * (Max - Min)); //舍去
                            return num;
                        };
                        let arr = [];
                        // 获取一组6个数字
                        for (let i = 0; i < 6; i++) {
                            // 调用上上面封装好的方法从22个数据中获取六个
                            arr[i] = RandomNum(0, 23);  // 调用上面封装好的方法
                            for (var j = 0; j < i; j++) {
                                //如果重复则 i-- 重新产生一个
                                if (arr[i] == arr[j]) {
                                    i--;
                                    break;
                                };
                            };
                        };
                        group.forEach((item, index) => {
                            let dat = data[0].headerNavLeftLivecastPull,
                                temp = dat[arr[index]],
                                { pic, title } = temp;
                            item.children[0].children[0].src = `${pic}`;
                            item.children[1].textContent = `${title}`;
                        });
                    };
                };
                headerNavLivecastPull();
            }
            headerNavSearchForm();
        })();
        return data
    })()
        .then(() => {


            const main = (function main() {

                // 获取 main 标签
                let main = document.querySelector(".content"),
                    carouselMaskList = main.querySelector(".carousel-mask"),
                    swiperSlide = Array.from(main.querySelectorAll(".swiper-slide")),
                    swiperButtonPrev = main.querySelector(".swiper-button-prev"),
                    swiperWrapperList = Array.from(main.querySelectorAll(".swiper-wrapper img"));

                // 获取main下的轮播图所需标签
                // 轮播图
                (() => {
                    let conBoxSwiperLData = data[0].conBox_swiper_l;
                    // 创建一个值 控制背景颜色的切换
                    let temp = 0;
                    // 初始化背景颜色

                    carouselMaskList.style.backgroundColor = "rgb(110, 97, 89)";

                    (() => {
                        let arr = [];
                        for (let t = 0; t < swiperWrapperList.length; t += 9) {
                            let group = swiperWrapperList.slice(t, t + 9)
                            function RandomNum(Min, Max) {
                                let num = Min + Math.floor(Math.random() * (Max - Min)); //舍去
                                return num;
                            };
                            // 获取一组9个数字
                            for (let i = 0; i < 9; i++) {
                                // 调用上上面封装好的方法从22个数据中获取六个
                                arr[i] = RandomNum(0, 18);  // 调用上面封装好的方法
                                for (var j = 0; j < i; j++) {
                                    //如果重复则 i-- 重新产生一个
                                    if (arr[i] == arr[j]) {
                                        i--;
                                        break;
                                    };
                                };
                            };
                            group.forEach((item, index) => {
                                let dat = conBoxSwiperLData,
                                    temp = dat[arr[index]],
                                    { pic, bckc } = temp;
                                item.src = `${pic}`;
                            });
                        };

                        var mySwiper = new Swiper('.swiper', {
                            /* direction: 'vertical', // 垂直切换选项 */
                            // 无限循环
                            loop: true,
                            autoplay: {
                                delay: 2000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            },
                            // 循环模式选项
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            },
                            // 禁止滑动
                            allowTouchMove: false,

                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            },

                            // 如果需要滚动条
                            scrollbar: {
                                el: '.swiper-scrollbar'
                            }, on: {
                                // 回调函数 切换时触发
                                slideChangeTransitionStart: function () {
                                    //your code
                                    let swiperSlide = main.querySelectorAll(".swiper-slide")
                                    swiperSlide.forEach(item => {
                                        let itemClass = item.getAttribute('class')
                                        if (itemClass == "swiper-slide swiper-slide-active") {
                                            let temp = item.getAttribute("data-swiper-slide-index");
                                            carouselMaskList.style.backgroundColor = `${conBoxSwiperLData[conBoxSwiperLData[arr[temp]].myId].bckc}`;
                                        }
                                    })
                                }
                            }
                        });


                    })();
                })();

                // 换一换图标
                let gridParent = main.querySelector(".gridParent"),
                    iconfont_huan = main.querySelectorAll(".grid_c_header_r .btn_hover_bck .iconfont");
                (() => {
                    iconfont_huan.forEach((item, index) => {
                        iconfont_huan[index].innerHTML = `<svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shuaxin"></use>
                    </svg>`;
                    })
                })();

                function RandomNum(Min, Max) {
                    let num = Min + Math.floor(Math.random() * (Max - Min)); //舍去
                    return num;
                };

                function child_xr(event, child_xr_box) {

                    // 绑定图片
                    let conBox_child = main.querySelector(`.${child_xr_box}`);
                    let conBox_child_img = conBox_child.querySelectorAll(`.grid_c_box .conBox_child img`),
                        conBox_child_title = conBox_child.querySelectorAll(".conBox_child_box .conBox_child h3"),
                        upname = conBox_child.querySelectorAll(" .up_name");

                    console.log();
                    let length = conBox_child.length
                    function RandomNum(Min, Max) {
                        let num = Min + Math.floor(Math.random() * (Max - Min)); //舍去
                        return num;
                    };

                    child_data = data[0].conBox_child
                    conBox_child_img.forEach((item, index) => {
                        let temp = RandomNum(0, 100)
                        // console.log(RandomNum(0, 100));
                        // console.log(data[index]);
                        item.src = child_data[temp].pic
                        conBox_child_title[index].innerHTML = child_data[temp].title;
                        upname[index].innerHTML = child_data[temp].upname
                        // console.log(child_data[temp].pic);

                    });


                };
                function huan(event, child_xr_box, index) {
                    let conBox_child = main.querySelector(`.${child_xr_box}`);
                    let huan_huan = conBox_child.querySelector(".grid_c_header_r_btn_l");
                    /*  test.addEventListener('click', function (event) {
                         testFun(event, 'this is a test');
                     }); */
                    huan_huan.addEventListener('click', function (event) {
                        child_xr(event, child_xr_box);
                        /*  num += 360;
                         console.log(iconfont_huan, child_xr_box);
                         iconfont_huan[index].style.transform = `rotate(${num}deg)`;
 
  */
                    })
                };

                /*  test.addEventListener('click', function (event) {
                                testFun(event, 'this is a test');
                            }); */
                /* let huan_huan = main.querySelector(".grid_c_header_r_btn_l");
            
               
                huan_huan.addEventListener('click', function (event) {
                    child_xr(event, 'zhi_bo');
                }) */

                /*  const child_xr = (child_xr_box) => {
             
                     // 绑定图片
                     let conBox_child = main.querySelector(`.${child_xr_box}`);
                     let conBox_child_img = conBox_child.querySelectorAll(`.grid_c_box .conBox_child img`),
                         conBox_child_title = conBox_child.querySelectorAll(".conBox_child_box .conBox_child h3"),
                         upname = conBox_child.querySelectorAll(" .up_name");
             
             
                     let length = conBox_child.length
                     function RandomNum(Min, Max) {
                         let num = Min + Math.floor(Math.random() * (Max - Min)); //舍去
                         return num;
                     };
             
                     child_data = data[0].conBox_child
                     conBox_child_img.forEach((item, index) => {
                         let temp = RandomNum(0, 100)
                         // console.log(RandomNum(0, 100));
                         // console.log(data[index]);
                         item.src = child_data[temp].pic
                         conBox_child_title[index].innerHTML = child_data[temp].title;
                         upname[index].innerHTML = child_data[temp].upname
                         // console.log(child_data[temp].pic);
                     });
             
                 }; */
                let arr = ['fan_ju_dong_tai', 'guo_chuang', 'china_xiang_guan', 'zong_yi', 'yin_yue', 'wu_dao', 'you_xi', 'zhi_shi', 'ke_tang', 'fan_ju', 'dong_hua', 'ke_ji', 'yun_dong', 'qi_che', 'sheng_huo', 'mei_shi', 'dong_wu_quan', 'gui_chu', 'shi_shang', 'zi_xun', 'yu_le', 'dian_ying', 'dian_shi_ju', 'ying_shi', 'ji_lu_pian', 'zhi_bo'];
                arr.forEach(item => {
                    child_xr(event, item);
                    huan(event, item)
                });

                (() => {
                    let huan_huan = main.querySelectorAll(".grid_c_header_r_btn_l");
                    let zhuan = main.querySelectorAll(".grid_c_header_r_btn_l .iconfont");

                    huan_huan.forEach((item, index) => {
                        let num = 360;

                        item.onclick = () => {
                            num += 360;


                            console.log(zhuan);
                            zhuan[index].style.transform = `rotate(${num}deg)`;
                        }
                    })


                })();

                function child_xr_(event, child_xr_box) {

                    // 绑定图片
                    let conBox_child = main.querySelector(`.${child_xr_box}`);
                    let conBox_child_img = conBox_child.querySelectorAll(`.conBox_child img`),
                        conBox_child_title = conBox_child.querySelectorAll(".conBox_child_box .conBox_child h3"),
                        upname = conBox_child.querySelectorAll(" .up_name");
                    let length = conBox_child.length
                    function RandomNum(Min, Max) {
                        let num = Min + Math.floor(Math.random() * (Max - Min)); //舍去
                        return num;
                    };

                    child_data = data[0].conBox_child
                    conBox_child_img.forEach((item, index) => {
                        let temp = RandomNum(0, 100)
                        // console.log(RandomNum(0, 100));
                        // console.log(data[index]);
                        item.src = child_data[temp].pic
                        conBox_child_title[index].innerHTML = child_data[temp].title;
                        upname[index].innerHTML = child_data[temp].upname
                        // console.log(child_data[temp].pic);

                    });

                };
                child_xr_(event, 'tui_guang');
                child_xr_(event, 'conBox_swiper');
                // 绑定换一换
                /*   let huan_huan = main.querySelectorAll(".conBox_child_box .grid_c_header_r .iconfont") */

                (() => {
                    let listText = document.querySelectorAll(".conBox_liveList .liveList_con_text");
                    listText[0].innerHTML = data[0].list[RandomNum(0, 25)].title
                    listText.forEach(item => {
                        item.innerHTML = data[0].list[RandomNum(0, 24)].title

                        /* item.innerHTML = `${data[0].list[RandomNum(0,25)].title}` */
                    })
                })();

                (() => {

                    window.addEventListener("scroll", function () {
                        let h = document.documentElement.scrollTop || document.body.scrollTop;
                        let bh = document.documentElement.clientHeight || document.body.clientHeight;
                        let visibility_box = this.document.querySelector(".visibility_box");
                        if (h > bh) {
                            visibility_box.style.visibility = 'hidden';
                        };
                        if (h <= bh) {
                            visibility_box.style.visibility = 'visible';
                        };
                    });

                })();


            })();


        });


})();
