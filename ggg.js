<template>
  <TestQuestionPage
    v-if="!loading"
    :key="question.id"
    ref="testQuestionPage"
    :question="question"
    :test-attempt="testAttempt"
    :menu="menu"
    :fact-order="factOrder"
  />
  <div v-else class="flex justify-center py-8 h-96">
    <clip-loader
      class="flex items-center mr-2"
      :color="'#2563EB'"
      :size="'48px'"
    />
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import TestQuestionPage from '@/components/surveys/TestQuestionPage'
import breadcrumbs from '@/mixins/breadcrumbs'
import loadTestAttemptResource from '@/mixins/loadResources/loadTestAttemptResource'
import trackTime from '@/mixins/trackTime'

export default {
  name: 'Index',
  components: {
    TestQuestionPage,
    ClipLoader,
  },
  mixins: [loadTestAttemptResource, breadcrumbs, trackTime],
  async beforeRouteUpdate(to, from, next) {
    await this.$refs.testQuestionPage.prepareToChangeRoute()
    next()
  },
  data() {
    return {
      menu: [],
      question: null,
      testAttempt: null,
      loading: true,
    }
  },

  async fetch() {
    this.loading = true
    await Promise.all([
      this.loadQuestion(),
      this.loadTestAttempt(this.$route.params.testAttemptId),
      this.loadTestAttemptQuestionsMenu(this.$route.params.testAttemptId),
    ])
    await this.pushBreadcrumbs()
    this.loading = false
    if (!this.testAttempt.is_graded && !this.testAttempt.is_passed) {
      this.initTracker('test-attempt', this.$route.params.testAttemptId)
    }
  },
  computed: {
    factOrder() {
      let order = ''
      this.menu.forEach((item) => {
        if (this.question.data.title === item.title) {
          order = item.order
        }
      })
      return order + 1
    },
  },
  methods: {
    async loadQuestion() {
      const response = await this.$axios.get(
        `/test-attempt/${this.$route.params.testAttemptId}/questions/${this.$route.params.questionId}`
      )
      this.question = response.data
    },
    async pushBreadcrumbs() {
      const crumbs = await this.loadBreadcrumbs(
        'test-attempt',
        this.$route.params.testAttemptId
      )
      crumbs.push({
        title: this.question ? `Вопрос ${this.factOrder}` : '',
        path: `${crumbs[crumbs.length - 1].path}/question/${this.question.id}`,
      })
      this.loadedCrumbs = crumbs
    },
  },
}
</script>

<style scoped></style>
