// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  const phrases = [
  
    '    One other little punctuation mark one can have feelings about and that is the apostrophe for possession. Well feel as you like about that, I can see and I do see that for many that for some the possessive case apostrophe has a gentle tender insinuation',
    'that makes it very difficult to definitely decide to do without it.',
     'One does do without it, I do, I mostly always do, but I cannot deny that from time to time I feel myself having regrets and from time to time I put it in to make the possessive case.',
     ' I absolutely do not like it and leaving it out I feel no regret, there it is unnecessary and not ornamental but inside a word and its s well perhaps, perhaps it does appeal by its weakness to your weakness.', 
    //  'At least at any rate from time to time I do find myself letting it alone if it has come in and sometimes it has come in. I cannot positively deny but that I do from time to time let it come in.', 
    // '    So now to come to the real question of punctuation, periods, commas, colons, semi-colons and capitals and small letters.',

    'I have had a long and complicated life with all these.',
    'Let us begin with these I use the least first and these are colons and semi-colons, one might add to these commas.',
  ]
  
  const el = document.querySelector('.textone')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next()