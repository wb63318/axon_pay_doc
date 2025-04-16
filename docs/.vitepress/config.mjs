import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'


// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "Axon Pay Docs",
    description: "A VitePress Site",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        //{ text: 'Examples', link: '/markdown-examples' }
      ],

      sidebar: [
        {
          text: 'Getting Started',
          items: [
            { text: 'AxonPay Components', link: '/guide/pay_components' },
            { text: 'AxonPay Functionalities', link: '/guide/pay_functionalities' },
            { text: 'AxonPay Transaction Flows', link: '/guide/transaction_flows_1' },
            //{text: 'AxonPay Mermaid Demo', link: '/guide/demo'},
          ],
        },
        {
          text: 'Mermaid',
          items: [
            { text: 'AxonPay Transaction Flowcharts', link: '/guide/mermaid/axonpay_transaction_flowchart' },
            { text: 'BankCard', link: '/guide/mermaid/bankcard' },
            { text: 'Collection Transaction', link: '/guide/mermaid/collection_transaction' },
            { text: 'Disbursement Transaction - Local Transaction - Bank Account', link: '/guide/mermaid/disbursement_local_bank' },
            { text: 'Disbursement Transaction - Local Transaction - Mobile Wallet', link: '/guide/mermaid/disbursement_local_mobile' },
            { text: 'Remittance Transaction - Bank Account', link: '/guide/mermaid/remitance_bank' },
            { text: 'Remittance Transaction - Mobile Account', link: '/guide/mermaid/remittance_mobile' },
            { text: 'Mobile -Wallet', link: '/guide/mermaid/mobile-wallet' },
          ]
        }
      ],
      /* socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
      ] */
    },
  }
  ))
