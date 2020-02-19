<!-- 
페이징 컴포넌트 

Made In Korea
Made By ms.seol
        
 -->
<template id="msPagination">
<div>
  <div class="left">
    <span class="page_txt">총 {{mTotalPage}} 페이지 중 <strong>{{mPage}}</strong> 페이지
    </span>
  </div>
  <div class="right">
    <div class="paging">
      <button class="first" :disabled="mPrevGroup" @click="pageMove('first')"></button>
      <button class="prev" :disabled="mPrevGroup" @click="prevPageMove"></button>
      <span><button @click="selectPageMove(idx + mStart)" :class="{on : ((idx + mStart) == mPage)}" v-for="(num, idx) in mPageGroupSize" v-if="idx + mStart <= mTotalPage">{{idx + mStart}}</button></span>
      <button class="next" :disabled="mNextGroup" @click="nextPageMove"></button>
      <button class="end" :disabled="mNextGroup" @click="pageMove('last')"></button>
    </div>
  </div>
</div>
</template>
<script>
  var ms_pagination = Vue.component('ms-pagination', {
    template : '#msPagination',
    props : ['totalCnt', 'page', 'pageGroupSize', 'articleSize', 'pageMoveEventFunc'],
    watch : {
      totalCnt: function(newVal, oldVal){
        this.pagination();
      },
      articleSize: function(newVal, oldVal){
        this.pagination();
      },
      page: function(newVal, oldVal){
        this.pagination();
      }
    },
    data : function () {
      return {
        mPrevGroup : false,
        mNextGroup : false,
        mTotalCnt : null,
        mArticleSize : null,
        mPage : null,
        mTotalPage : null,
        mPageGroupSize : (this.pageGroupSize == undefined)? 5 : this.pageGroupSize,
        mNowPageGroup : null,
        mStart : null,
        mEnd : null,
      }
    },
    created : function() {
      this.pagination();
    },
    methods : {
      pagination(){
        this.mTotalCnt = this.totalCnt;
        this.mArticleSize = this.articleSize;
        this.mPage = this.page;
        this.mTotalPage = Math.ceil(this.mTotalCnt / this.mArticleSize);
        this.mNowPageGroup = Math.ceil(this.mPage / this.mPageGroupSize);
        this.mStart = (this.mNowPageGroup - 1) * this.mPageGroupSize + 1;
        this.mEnd = this.mStart + this.mPageGroupSize -1;

        this.mPrevGroup = (this.mNowPageGroup - 1 < 1);
        this.mNextGroup = (this.mNowPageGroup + 1 > Math.ceil(this.mTotalPage / this.mPageGroupSize));
      },
      prevPageMove() {
        this.mNowPageGroup = this.mNowPageGroup - 1;
        this.mPage = (this.mNowPageGroup - 1) * this.mPageGroupSize + 1;
        this.pageMoveEventFunc(this.mPage);
        this.pagination();
      },
      nextPageMove() {
        this.mNowPageGroup = this.mNowPageGroup + 1;
        this.mPage = (this.mNowPageGroup - 1) * this.mPageGroupSize + 1;
        this.pageMoveEventFunc(this.mPage);
        this.pagination();
      },
      pageMove(type) {
        if(type=='first'){
          this.mPage = 1;
        } else if(type=='last'){
          this.mPage = this.mTotalPage;
        }
        this.pageMoveEventFunc(this.mPage);
        this.pagination();
      },
      selectPageMove(page){
        this.mPage = page;
        this.pageMoveEventFunc(this.mPage);
        this.pagination();
      }
    }
  });
</script>
