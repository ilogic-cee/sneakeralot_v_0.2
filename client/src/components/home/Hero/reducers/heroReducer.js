export const initialState = {
  currentSlide: 0,
  direction: 'next',
  isTransitioning: false,
  isAutoPlaying: true,
  zoomLevel: 1,
  isZoomed: false,
  panPosition: { x: 0, y: 0 },
  progress: 0,
  activeQuickView: null,
  networkStatus: navigator.onLine,
  error: null
};

export const actionTypes = {
  NEXT_SLIDE: 'NEXT_SLIDE',
  PREV_SLIDE: 'PREV_SLIDE',
  GO_TO_SLIDE: 'GO_TO_SLIDE',
  SET_TRANSITION: 'SET_TRANSITION',
  TOGGLE_AUTOPLAY: 'TOGGLE_AUTOPLAY',
  UPDATE_ZOOM: 'UPDATE_ZOOM',
  UPDATE_PAN: 'UPDATE_PAN',
  RESET_ZOOM: 'RESET_ZOOM',
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
  TOGGLE_QUICKVIEW: 'TOGGLE_QUICKVIEW',
  SET_NETWORK_STATUS: 'SET_NETWORK_STATUS',
  SET_ERROR: 'SET_ERROR'
};

export const heroReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEXT_SLIDE:
      return {
        ...state,
        currentSlide: (state.currentSlide + 1) % action.totalSlides,
        direction: 'next',
        isTransitioning: true,
        progress: 0
      };

    case actionTypes.PREV_SLIDE:
      return {
        ...state,
        currentSlide: (state.currentSlide - 1 + action.totalSlides) % action.totalSlides,
        direction: 'prev',
        isTransitioning: true,
        progress: 0
      };

    case actionTypes.GO_TO_SLIDE:
      return {
        ...state,
        currentSlide: action.index,
        direction: action.index > state.currentSlide ? 'next' : 'prev',
        isTransitioning: true,
        progress: 0
      };

    case actionTypes.SET_TRANSITION:
      return {
        ...state,
        isTransitioning: action.isTransitioning
      };

    case actionTypes.TOGGLE_AUTOPLAY:
      return {
        ...state,
        isAutoPlaying: !state.isAutoPlaying
      };

    case actionTypes.UPDATE_ZOOM:
      return {
        ...state,
        zoomLevel: action.zoomLevel,
        isZoomed: action.zoomLevel > 1,
        isAutoPlaying: action.zoomLevel > 1 ? false : state.isAutoPlaying
      };

    case actionTypes.UPDATE_PAN:
      return {
        ...state,
        panPosition: action.position
      };

    case actionTypes.RESET_ZOOM:
      return {
        ...state,
        zoomLevel: 1,
        isZoomed: false,
        panPosition: { x: 0, y: 0 }
      };

    case actionTypes.UPDATE_PROGRESS:
      return {
        ...state,
        progress: action.progress
      };

    case actionTypes.TOGGLE_QUICKVIEW:
      return {
        ...state,
        activeQuickView: state.activeQuickView === action.id ? null : action.id
      };

    case actionTypes.SET_NETWORK_STATUS:
      return {
        ...state,
        networkStatus: action.status
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}; 