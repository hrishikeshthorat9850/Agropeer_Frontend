/**
 * Examples of how to implement lazy loading in your components
 * Copy and adapt these patterns to your existing components
 */

// ============================================
// EXAMPLE 1: Lazy Load Heavy Components
// ============================================

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load heavy components (charts, maps, editors, etc.)
const Recharts = dynamic(() => import('recharts'), { ssr: false });
const ChartComponent = dynamic(() => import('@/components/Chart'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

// ============================================
// EXAMPLE 2: Lazy Load Images
// ============================================

import LazyImage from '@/components/LazyImage';
// OR use Next.js Image with loading="lazy"
import Image from 'next/image';

function ImageExample() {
  return (
    <>
      {/* Above the fold - load immediately */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={1200}
        height={600}
        priority // Load immediately
      />

      {/* Below the fold - lazy load */}
      <LazyImage
        src="/gallery/image1.jpg"
        alt="Gallery 1"
        width={800}
        height={600}
      />
    </>
  );
}

// ============================================
// EXAMPLE 3: Lazy Load with Intersection Observer
// ============================================

import { useLazyLoad } from '@/hooks/useLazyLoad';
const BASE_URL = process.env.BASE_URL;

function LazySection() {
  const [ref, isVisible] = useLazyLoad();

  return (
    <div ref={ref}>
      {isVisible ? (
        <HeavyComponent />
      ) : (
        <div className="h-64 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 4: Lazy Load Data/API Calls
// ============================================

import { useLazyFetch } from '@/hooks/useLazyLoad';

function LazyDataComponent() {
  const [ref, { data, loading, error }] = useLazyFetch(
    () => fetch(`${BASE_URL}/api/products`).then(r => r.json())
  );

  return (
    <div ref={ref}>
      {loading && <LoadingSpinner />}
      {error && <div>Error: {error.message}</div>}
      {data && <ProductList products={data} />}
    </div>
  );
}

// ============================================
// EXAMPLE 5: Lazy Load Modal Content
// ============================================

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ModalContent = dynamic(() => import('./ModalContent'), {
  loading: () => <div>Loading modal...</div>,
});

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <Modal>
          <ModalContent />
        </Modal>
      )}
    </>
  );
}

// ============================================
// EXAMPLE 6: Lazy Load Third-Party Libraries
// ============================================

// Instead of: import HeavyLibrary from 'heavy-library';
const HeavyLibrary = dynamic(() => import('heavy-library'), {
  ssr: false,
});

// ============================================
// EXAMPLE 7: Lazy Load Route Components
// ============================================

// Next.js automatically lazy loads routes, but you can also do:
const LazyPage = dynamic(() => import('@/app/some-page'), {
  loading: () => <LoadingSpinner />,
});

// ============================================
// EXAMPLE 8: Lazy Load Lists/Infinite Scroll
// ============================================

import { useLazyLoad } from '@/hooks/useLazyLoad';

function InfiniteScrollList({ items }) {
  const [loadMoreRef, isVisible] = useLazyLoad();

  useEffect(() => {
    if (isVisible) {
      // Load more items
      loadMore();
    }
  }, [isVisible]);

  return (
    <>
      {items.map(item => <Item key={item.id} {...item} />)}
      <div ref={loadMoreRef}>
        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
}

