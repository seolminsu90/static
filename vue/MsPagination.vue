<template>
    <div>
        <div class="left">
            <span class="page_txt">총 {{ mTotalPage }} 페이지 중 <strong>{{ mPage }}</strong> 페이지
            </span>
        </div>
        <div class="right">

            <ul class="pagination">
                <li class="page-item" :disabled="mPrevGroup" @click="pageMove('first')"><span class="page-link">처음</span></li>
                <li class="page-item" :disabled="mPrevGroup" @click="prevPageMove"><span class="page-link">이전</span> </li>

                <template v-for="pgno in mPageGroupSize">
                    <li @click="selectPageMove(pgno)" :class="{ active: (pgno == mPage) }" class="page-item"
                        v-if="mStart <= mTotalPage" :key="pgno"><span class="page-link">{{ pgno }}</span></li>
                </template>

                <li class="page-item" :disabled="mNextGroup" @click="nextPageMove"><span class="page-link">다음</span> </li>
                <li class="page-item" :disabled="mNextGroup" @click="pageMove('last')"><span class="page-link">맨끝</span> </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MsPagination',
    props: {
        totalCnt: {
            type: Number
        },
        page: {
            type: Number
        },
        pageGroupSize: {
            type: Number
        },
        articleSize: {
            type: Number
        },
        pageMoveEventFunc: {
            type: Function
        }
    },
    watch: {
        totalCnt: function () { this.pagination() },
        articleSize: function () { this.pagination() },
        page: function (o, n) { this.pagination() }
    },
    created() {
        this.pagination()
    },
    data() {
        return {
            mPrevGroup: false,
            mNextGroup: false,
            mTotalCnt: null,
            mArticleSize: null,
            mPage: null,
            mTotalPage: null,
            mPageGroupSize: (this.pageGroupSize == undefined) ? 5 : this.pageGroupSize,
            mNowPageGroup: null,
            mStart: null,
            mEnd: null
        }
    },
    methods: {
        pagination() {
            this.mTotalCnt = this.totalCnt
            this.mArticleSize = this.articleSize
            this.mPage = this.page
            this.mTotalPage = Math.ceil(this.mTotalCnt / this.mArticleSize)
            this.mNowPageGroup = Math.ceil(this.mPage / this.mPageGroupSize)
            this.mStart = (this.mNowPageGroup - 1) * this.mPageGroupSize + 1
            this.mEnd = this.mStart + this.mPageGroupSize - 1
            this.mPrevGroup = (this.mNowPageGroup - 1 < 1)
            this.mNextGroup = (this.mNowPageGroup + 1 > Math.ceil(this.mTotalPage / this.mPageGroupSize))
        },
        prevPageMove() {
            this.mNowPageGroup = this.mNowPageGroup - 1
            this.mPage = (this.mNowPageGroup - 1) * this.mPageGroupSize + 1
            this.pageMoveEventFunc(this.mPage)
            this.pagination()
        },
        nextPageMove() {
            this.mNowPageGroup = this.mNowPageGroup + 1
            this.mPage = (this.mNowPageGroup - 1) * this.mPageGroupSize + 1
            this.pageMoveEventFunc(this.mPage)
            this.pagination()
        },
        pageMove(type) {
            if (type == 'first') {
                this.mPage = 1
            } else if (type == 'last') {
                this.mPage = this.mTotalPage
            }
            this.pageMoveEventFunc(this.mPage)
            this.pagination()
        },
        selectPageMove(page) {
            this.mPage = page
            this.pageMoveEventFunc(this.mPage)
            this.pagination()
        }
    }
}
</script>

<style scoped>
</style>