import { track } from '@vercel/analytics'

/**
 * Analytics utility for tracking user interactions and events
 */
export const analytics = {
  /**
   * Track project view events
   * @param projectId - The ID of the project being viewed
   * @param projectTitle - The title of the project
   */
  trackProjectView: (projectId: string, projectTitle?: string) => {
    track('project_view', { 
      project_id: projectId,
      project_title: projectTitle 
    })
  },
  
  /**
   * Track language switch events
   * @param language - The language being switched to
   * @param fromLanguage - The language being switched from
   */
  trackLanguageSwitch: (language: string, fromLanguage?: string) => {
    track('language_switch', { 
      language,
      from_language: fromLanguage 
    })
  },
  
  /**
   * Track chat message events
   * @param messageCount - The number of messages in the conversation
   * @param messageLength - The length of the current message
   */
  trackChatMessage: (messageCount: number, messageLength?: number) => {
    track('chat_message', { 
      count: messageCount,
      message_length: messageLength 
    })
  },
  
  /**
   * Track contact form submission events
   * @param formType - The type of form being submitted
   * @param success - Whether the submission was successful
   */
  trackContactFormSubmit: (formType: string = 'contact', success: boolean = true) => {
    track('contact_form_submit', { 
      form_type: formType,
      success 
    })
  },

  /**
   * Track theme/style changes
   * @param theme - The theme being switched to
   * @param style - The style being switched to
   */
  trackThemeChange: (theme: string, style?: string) => {
    track('theme_change', { 
      theme,
      style 
    })
  },

  /**
   * Track navigation events
   * @param page - The page being navigated to
   * @param fromPage - The page being navigated from
   */
  trackNavigation: (page: string, fromPage?: string) => {
    track('navigation', { 
      page,
      from_page: fromPage 
    })
  },

  /**
   * Track download events
   * @param fileType - The type of file being downloaded
   * @param fileName - The name of the file
   */
  trackDownload: (fileType: string, fileName?: string) => {
    track('download', { 
      file_type: fileType,
      file_name: fileName 
    })
  },

  /**
   * Track external link clicks
   * @param url - The URL being clicked
   * @param linkText - The text of the link
   */
  trackExternalLink: (url: string, linkText?: string) => {
    track('external_link', { 
      url,
      link_text: linkText 
    })
  },

  /**
   * Track search events
   * @param query - The search query
   * @param resultsCount - The number of results
   */
  trackSearch: (query: string, resultsCount?: number) => {
    track('search', { 
      query,
      results_count: resultsCount 
    })
  },

  /**
   * Track error events
   * @param errorType - The type of error
   * @param errorMessage - The error message
   * @param component - The component where the error occurred
   */
  trackError: (errorType: string, errorMessage?: string, component?: string) => {
    track('error', { 
      error_type: errorType,
      error_message: errorMessage,
      component 
    })
  }
}

/**
 * Hook for tracking page views
 * @param pageName - The name of the page
 */
export function usePageTracking(pageName: string) {
  if (typeof window !== 'undefined') {
    track('page_view', { page: pageName })
  }
}

/**
 * Utility to track performance metrics
 */
export const performanceAnalytics = {
  /**
   * Track page load time
   * @param loadTime - The time it took to load the page
   * @param page - The page that was loaded
   */
  trackPageLoad: (loadTime: number, page: string) => {
    track('page_load', { 
      load_time: loadTime,
      page 
    })
  },

  /**
   * Track component render time
   * @param componentName - The name of the component
   * @param renderTime - The time it took to render
   */
  trackComponentRender: (componentName: string, renderTime: number) => {
    track('component_render', { 
      component: componentName,
      render_time: renderTime 
    })
  },

  /**
   * Track API response time
   * @param endpoint - The API endpoint
   * @param responseTime - The time it took to get a response
   * @param status - The HTTP status code
   */
  trackApiResponse: (endpoint: string, responseTime: number, status: number) => {
    track('api_response', { 
      endpoint,
      response_time: responseTime,
      status 
    })
  }
}
