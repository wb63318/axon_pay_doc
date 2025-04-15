import { defineConfig } from 'vitepress'
import { withMermaid} from 'vitepress-plugin-mermaid'


// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "Axon Pay Docs",
    description: "A VitePress Site",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' }
      ],
  
      sidebar: [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ],
  
      socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
      ]
    },
    /* markdown: {
      config: (md) => {
        MermaidPlugin.mdPlugin(md)
      }
    },
    vite: {
      plugins: [MermaidPlugin.vitePlugin()]
    } */
  
  }
  ))
