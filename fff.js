<template>
  <validation-observer ref="validator">
    <div
      v-if="testAttempt && question && menu.length"
      :id="`question-${question.id}`"
      class="container px-4 mx-auto flex justify-between flex-col-reverse lg:flex-row"
    >
      <div class="w-full lg:w-2/3 mb-6 lg:mb-0 lg:pr-12">
        <v-timer
          class="mb-2"
          :remaining-time="testAttempt.remaining_time"
          @end="onTestAttemptTimerEnd"
        />
        <div
          v-if="
            !testAttempt.is_graded &&
            !testAttempt.is_passed &&
            testAttempt.is_timed_out
          "
          class="text-red-500 mb-2 font-bold"
        >
          Время попытки вышло. Проходит проверка
        </div>
        <template v-if="questionComponent">
          <component
            :is="questionComponent"
            v-if="!checkMode"
            ref="questionComponent"
            :item="question"
            :index="factOrder"
            class="mb-4"
            @update="update"
          />
          <component
            :is="questionComponent"
            v-else
            :index="factOrder"
            :answers="question.data.answers"
            :should-be-marked="question.survey.should_be_marked"
            :should-show-results-before-finish-date="
              question.survey.should_show_results_before_finish_date
            "
            :finished-survey="question.survey.is_finished"
            :is-graded="testAttempt.is_graded"
            :survey-type="question.survey.type"
            :question="question"
          />
          <div class="flex my-7 text-xs italic -ml-1 space-x-2">
            <div>
              <mdi-lightbulb-outline class="text-blue-primary" :size="35" />
            </div>
            <div class="flex flex-wrap flex items-end">
              <p class="w-full">
                Ответы можно редактировать, пока тест не завершен
              </p>
              <p class="w-full">
                Вы не сможете завершить тест, пока не ответите на все
                обязательные вопросы (отмечены
                <span class="text-red-600">*</span>)
              </p>
            </div>
          </div>
          <div
            class="flex items-center mb-7 w-full"
            :class="
              !previousQuestionLink
                ? 'justify-end'
                : !nextQuestionLink
                ? 'justify-start'
                : 'justify-between'
            "
          >
            <the-button
              v-if="previousQuestionLink"
              outlined
              nuxt
              class="mr-2"
              :icon="isMobile ? 'mdi-left' : ''"
              :to="previousQuestionLink"
            >
              {{ !isMobile ? 'Предыдущий вопрос' : '' }}
            </the-button>
            <the-button
              v-if="nextQuestionLink"
              outlined
              nuxt
              class="ml-2"
              :icon="isMobile ? 'mdi-right' : ''"
              :to="nextQuestionLink"
            >
              {{ !isMobile ? 'Следующий вопрос' : '' }}
            </the-button>
          </div>
          <div
            v-if="
              !testAttempt.is_graded &&
              !testAttempt.is_passed &&
              !testAttempt.is_timed_out
            "
            class="flex items-center justify-center md:justify-end mt-20"
          >
            <the-button
              secondary
              :disabled="isSaveButtonBlocked"
              :icon="isMobile ? 'mdi-save' : ''"
              @click.native="saveQuestionAndGoBack"
              >{{ !isMobile ? 'Сохранить прогресс и выйти' : '' }}
            </the-button>
            <the-button
              primary
              class="ml-2 mb-0"
              :icon="isMobile ? 'mdi-check' : ''"
              @click.native="openTestFinishModal"
            >
              {{ !isMobile ? 'Завершить тест' : '' }}
            </the-button>
          </div>
          <div
            v-else-if="testAttempt.is_graded"
            class="flex flex-col items-center justify-center"
          >
            <the-button
              primary
              nuxt
              :to="
                toResult(
                  $route.params.slug,
                  $route.params.surveySlug,
                  $route.params.testAttemptId
                )
              "
            >
              Перейти к результату
            </the-button>
          </div>
          <finish-test-modal
            ref="finishTestModal"
            :form-sent="formSent"
            @confirm="finish"
          />
        </template>
      </div>
      <div class="w-full lg:w-1/3 mb-8 lg:mb-0">
        <test-questions-navigation-menu
          :menu="menu"
          :is-graded="testAttempt.is_graded"
          :should-be-marked="question.survey.should_be_marked"
          :can-user-view-answer-in-survey-before-finished="
            question.survey.can_user_view_answer_in_survey_before_finished
          "
          :should-show-results-before-finish-date="
            question.survey.should_show_results_before_finish_date
          "
          :finished-survey="question.survey.is_finished"
        ></test-questions-navigation-menu>
      </div>
    </div>
  </validation-observer>
</template>

<script>
import TestQuestionsNavigationMenu from '@/components/surveys/TestQuestionsNavigationMenu'
import Button from '@/components/FileIcon'
import redirectToTestPages from '@/mixins/surveys/redirectToTestPages'
import FinishTestModal from '@/components/surveys/FinishTestModal'
import VTimer from '@/components/VTimer'
import surveyParentRedirectParams from '@/mixins/surveys/surveyParentRedirectParams'

export default {
  name: 'TestQuestionPage',
  components: {
    VTimer,
    FinishTestModal,
    Button,
    TestQuestionsNavigationMenu,
  },
  mixins: [redirectToTestPages, surveyParentRedirectParams],
  props: {
    question: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    testAttempt: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    menu: {
      type: Array,
      required: true,
      default: () => [],
    },
    factOrder: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      value: null,
      checkMode: false,
      disableSaveButton: false,
      formSent: false,
      isMobile: false,
    }
  },
  computed: {
    isSaveButtonBlocked() {
      if (this.disableSaveButton) {
        return true
      }

      if (!this.value) {
        return true
      }

      if (this.value instanceof Array && this.value.length === 0) {
        return true
      }

      if (this.value.value === null || this.value.value === '') {
        return true
      }

      return this.value.value instanceof Array && this.value.value.length === 0
    },
    questionComponent() {
      if (!this.question.type) return
      if (this.checkMode) {
        return () =>
          import(
            `@/components/surveys/checkAnswers/Check${this.question.type}Answer`
          )
      }
      return () =>
        import(`@/components/surveys/questions/${this.question.type}Question`)
    },
    nextQuestionLink() {
      const currentQuestionInMenu = this.menu.find(
        (item) => item.id === this.question.id
      )
      const item = this.menu
        .filter((item) => item.order === currentQuestionInMenu.order + 1)
        .pop()
      return item
        ? this.getQuestionLink(
            this.$route.params.slug,
            this.$route.params.surveySlug,
            this.$route.params.testAttemptId,
            item.id
          )
        : ''
    },
    previousQuestionLink() {
      const currentQuestionInMenu = this.menu.find(
        (item) => item.id === this.question.id
      )
      const item = this.menu
        .filter((item) => item.order === currentQuestionInMenu.order - 1)
        .pop()
      return item
        ? this.getQuestionLink(
            this.$route.params.slug,
            this.$route.params.surveySlug,
            this.$route.params.testAttemptId,
            item.id
          )
        : ''
    },
    editMode() {
      return !!this.question?.has_answer
    },
    parent() {
      return this.question.survey.parent
    },
  },
  mounted() {
    this.checkMode =
      this.testAttempt.is_graded ||
      this.testAttempt.is_passed ||
      (this.question?.pivot && this.question.pivot.points !== null)
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler()
    console.log(this.factOrder)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    update(value) {
      this.value = value.answer
    },
    resizeHandler() {
      this.isMobile = window.innerWidth < 600
    },
    prepareData() {
      if (this.question.type === 'FileType' && this.$refs.questionComponent) {
        this.$refs.questionComponent.submit()
      }
      const formData = new FormData()
      formData.append(`test_attempt_id`, this.$route.params.testAttemptId)
      formData.append(`survey_question_id`, this.$route.params.questionId)
      if (this.value instanceof Array) {
        for (const key in this.value) {
          const value = this.value[key]
          formData.append(
            `collection[${key}][survey_answer_id]`,
            value.survey_answer_id
          )
          if (value.value instanceof Array) {
            for (const index in value.value) {
              formData.append(`collection[${key}][value][]`, value.value[index])
            }
          } else {
            formData.append(`collection[${key}][value]`, value.value)
          }
        }
      } else {
        if (this.value.value instanceof Array) {
          for (const index in this.value.value) {
            formData.append(`collection[0][value][]`, this.value.value[index])
          }
        } else {
          formData.append(`collection[0][value]`, this.value.value)
        }
        formData.append(
          `collection[0][survey_answer_id]`,
          this.value.survey_answer_id
        )
      }

      return formData
    },
    async saveQuestion() {
      this.disableSaveButton = true
      const validatorResult = await this.$refs.validator.validate()
      if (!validatorResult) {
        this.$toasted.error('Некорректный ответ', { duration: 3000 })
        setTimeout(() => {
          this.disableSaveButton = false
        }, 1500)
        return false
      }
      try {
        await this.$axios.post('survey-answer-values', this.prepareData())
        this.$toast.success('Ответ сохранен', {
          duration: 3000,
        })
        this.disableSaveButton = false
      } catch (e) {
        this.$toasted.error(e.response.data.message, { duration: 3000 })
        this.disableSaveButton = false
        return false
      }
      return true
    },
    async saveQuestionAndGoBack() {
      const questionIsSaved = await this.saveQuestion()
      if (!questionIsSaved) return
      await this.$router.push(this.parentRedirectParams.link)
    },
    openTestFinishModal() {
      this.$refs.finishTestModal.open()
    },
    async prepareToChangeRoute() {
      if (!this.isSaveButtonBlocked) {
        await this.saveQuestion()
      }
    },
    async finish() {
      if (!this.isSaveButtonBlocked) {
        await this.saveQuestion()
      }
      this.$refs.finishTestModal.close()
      try {
        await this.$axios.post(
          `test-attempts/${this.$route.params.testAttemptId}/finish`
        )
        this.$refs.finishTestModal.formSent = false
      } catch (e) {
        this.$refs.finishTestModal.formSent = false
        this.$toasted.error(e.response.data.message, { duration: 3000 })
        return
      }

      await this.$router.push(
        this.toResult(
          this.$route.params.slug,
          this.$route.params.surveySlug,
          this.$route.params.testAttemptId
        )
      )
    },
    async onTestAttemptTimerEnd() {
      await this.finish()
    },
  },
}
</script>
